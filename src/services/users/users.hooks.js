const commons = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [commons.discardQuery('$disableStashBefore')],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};