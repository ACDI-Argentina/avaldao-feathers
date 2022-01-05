

const log = () => context => {
  console.log(context.data);
  const userId = context.params.payload.userId;
  console.log(`userId:`,userId);

  return context;
};


const onlyRole = (role) => context => {
  let userId;

  if(context.params.payload && context.params.payload.userId){
    userId = context.params.payload.userId;
  }

  if(!userId){
    throw new Error('Unauthorized');  
  }
  const addressData = context.data[`${role}Address`];
  
  if(addressData !== userId){
    throw new Error(`Unauthorized. User: [${userId}] is not allowed to execute current action`);
  }
  
  return context;
};



module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [onlyRole("solicitante")],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};