const { UnauthorizedError, ForbiddenError } = require("../../errors/index");

const log = () => context => {
  console.log('Request data', context.data);
  console.log('Request params', context.params);
  const userId = context.params.payload.userId;
  console.log(`userId:`,userId);
  return context;
};


const onlyAuthenticated = () => context => {
  try{
    const userId = context.params.payload.userId; 
    if(!userId){
      throw new UnauthorizedError();  
    }
    return context;
  } catch(err){
    throw new UnauthorizedError();
  }
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
    throw new UnauthorizedError(); //TODO: Add details
  }
  
  if (context.data[`solicitanteAddress`] !== userId) {
    throw new Error(`Unauthorized. Bad Data. User: [${userId}] is not allowed to execute current action`); 
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
    throw new ForbiddenError("Token does not contain roles");
  }

  if(!jwtRoles.includes(rol)){
    throw new ForbiddenError(`Unauthorized. Missing role: [${rol}]`);
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
      throw new ForbiddenError();
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
      onlyAuthenticated(),
      log(),
      checkAvalSolicitante(),
      onlyJWTRole("SOLICITANTE_ROLE")
    ], 
    update: [],
    patch: [onlyAuthenticated(),onlyAvaldaoCanAccept()],
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