// Initializes the `avales` service on path `/avales`
const createService = require('feathers-mongoose');
const Aval = require('../../models/avales.model');
const hooks = require('./avales.hooks');

module.exports = function registerService() {
  const app = this;
  const Model = Aval(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'avales',
    Model,
    paginate,
  };

  // Initialize our service with any options it requires
  app.use('/avales', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('avales');

  service.hooks(hooks);
};