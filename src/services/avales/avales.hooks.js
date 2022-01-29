

const log = () => context => {
  console.log('Request data', context.data);
  console.log('Request params', context.params);
  const userId = context.params.payload.userId;
  console.log(`userId:`,userId);
  return context;
};

//Comprueba que el address del solicitante sea el mismo que llega en el body
const checkAvalSolicitante = () => context => {
  let userId;
  try {
    userId = context.params.payload.userId;
  } catch (err) {
    //property doesnt exist 
  }

  if (!userId) {
    throw new Error('Unauthorized');
  }
  
  if (context.data[`solicitanteAddress`] !== userId) {
    throw new Error(`Unauthorized. User: [${userId}] is not allowed to execute current action`);
  }

  return context;
};


//'AVALDAO_ROLE','SOLICITANTE_ROLE','COMERCIANTE_ROLE','AVALADO_ROLE'
const onlyJWTRole = (rol) => context => { //TODO: check type
  let jwtRoles;
  try{
    jwtRoles = context.params.payload.roles.avaldao;
  } catch(err){
    //property doesnt exist
  }

  if(!jwtRoles){
    throw new Error("Token does not contain roles");
  }

  if(!jwtRoles.includes(rol)){
    throw new Error(`Unauthorized. Missing role: [${rol}]`);
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
    create: [
      log(),
      checkAvalSolicitante(),
      onlyJWTRole("SOLICITANTE_ROLE")
    ], 
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