const commons = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');
const { toChecksumAddress } = require('web3-utils');

const notifyOfChange = require('../../hooks/notifyOfChange');
const sanitizeAddress = require('../../hooks/sanitizeAddress');
const setAddress = require('../../hooks/setAddress');
const resolveFiles = require('../../hooks/resolveFiles');

const normalizeId = () => context => {
  if (context.id) {
    context.id = toChecksumAddress(context.id);
  }
  return context;
};

const restrict = [
  normalizeId(),
  restrictToOwner({
    idField: 'address',
    ownerField: 'address',
  }),
];

const address = [
  setAddress('address'),
  sanitizeAddress('address', { required: true, validate: true }),
];

// TODO write a hook to prevent overwriting a non-zero giverId with 0

module.exports = {
  before: {
    all: [],
    find: [sanitizeAddress('address')],
    get: [normalizeId(),commons.discardQuery('$disableStashBefore')],
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