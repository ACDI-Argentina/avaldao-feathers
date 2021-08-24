const challenges = require('./challenges/challenges.service');
const avales = require('./avales/avales.service.js');
const users = require('./users/users.service.js');
const ipfsPinService = require('./ipfs-pin/ipfs-pin.service');

module.exports = function configure() {
  const app = this;
  app.configure(avales);
  app.configure(users);
  app.configure(challenges);
  app.configure(ipfsPinService);
};