const logger = require('winston');
const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const envConfig = require("../../../config/authentication");


module.exports = function init() {
  const app = this;
  const config = app.get('authentication');

  if(envConfig.secret){
    config.secret = envConfig.secret;
  }
  if(envConfig.audience){
    config.jwt.audience = envConfig.audience;
  }
  if(envConfig.issuer){
    config.jwt.issuer = envConfig.issuer;
  }
  
  logger.info(`accepted JWT tokens: { issuer:"${config.jwt.issuer}", audience:"${config.jwt.audience}" }`)

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate('jwt')],
    },
  });
};
