require('dotenv').config();

const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const configuration = require('@feathersjs/configuration');
const notFound = require('@feathersjs/errors/not-found');
//const { NotFound } = require('@feathersjs/errors');

const socketsConfig = require('./socketsConfig');
const configureLogger = require('./utils/configureLogger');
const logger = require('winston');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const authentication = require('./services/authentication/authentication');
const mongoose = require('./mongoose');
const ipfsFetcher = require('./utils/ipfsFetcher');
const ipfsPinner = require('./utils/ipfsPinner');
const channels = require('./channels');
const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');

// Creates an ExpressJS compatible Feathers application
const app = express(feathers());

// Load app configuration
app.configure(configuration());

app.configure(configureLogger);

app.use(cors());

app.use(helmet());
app.use(compress());
// Parse HTTP JSON bodies
app.use(express.json({ limit: '10mb' }));
// Parse URL-encoded params
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.configure(mongoose);
// Add REST API support
app.configure(express.rest());
app.configure(socketsConfig);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
app.configure(channels);
// blockchain must be initialized after services
//app.configure(ipfsFetcher);
//app.configure(ipfsPinner);

// Configure a middleware for 404s and the error handler
app.use(notFound());
//app.use(new NotFound());
// Register a nicer error handler than the default Express one
app.use(
  express.errorHandler({
    logger: {
      error: e => {
        if (e.name === 'NotFound') {
          logger.warn(`404 - NotFound - ${e.data.url}`);
        } else {
          logger.error(e);
        }
      },
    },
  }),
);

app.hooks(appHooks);

module.exports = app;