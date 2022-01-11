

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

const onlyAvaldaoCanAccept = () => async context => { //Or reject
  const aval = await context.service.get(context.id);
  if(!aval){
    throw new Error(`Aval ${context.id} not found.`)
  }
  const newStatus = context.data.status;
  if(aval.status === 0  || (newStatus === 1 && newStatus === 2)){ //is approving or rejecting
    let userId;

    if(context.params.payload && context.params.payload.userId){
      userId = context.params.payload.userId;
    }

    if(!userId || userId !== aval.avaldaoAddress){
      throw new Error('Unauthorized');  
    }
    
  }
  
  return context;
};


module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [log(),onlyRole("solicitante")], //TODO: USAR EL DEL SMART CONTRACT
    update: [],
    patch: [log(),onlyAvaldaoCanAccept()],
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