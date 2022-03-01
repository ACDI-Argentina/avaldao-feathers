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
const onlySolicitante = () => context => {
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

//Comprueba que el usuario quien solicito originalmente el aval
const onlySolicitanteOriginal = () => async context => { 
  let userId;
  try {
    userId = context.params.payload.userId;
  } catch (err) {
    //property doesnt exist 
  }

  if (!userId) {
    throw new UnauthorizedError(); //TODO: Add details
  }
  
  const storedAval = await context.service.get(context.id);

  if(storedAval.solicitanteAddress !== userId){
    throw new ForbiddenError();
  }


  return context;
};

const onlyAvalInStatus = status => async context => {
  const storedAval = await context.service.get(context.id);
  if(!storedAval){
    throw new Error("Not Found");
  }

  if(storedAval.status !== status){
    throw new Error("Incorrect status");
  }

  return context;
}


//Mantiene el estado previo de un aval, evita que al realizarse una actualizacion se modifique el estado
const keepStatus = () => async context => {
  const storedAval = await context.service.get(context.id);
  if(!storedAval){
    throw new Error("Not Found");
  }
  context.data.status = storedAval.status;
  
  return context;
}


//'AVALDAO_ROLE','SOLICITANTE_ROLE','COMERCIANTE_ROLE','AVALADO_ROLE'
const onlyJWTRole = (rol) => context => { //TODO: check type
  let jwtRoles;
  try{
    jwtRoles = context.params.payload.roles;
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
  if(aval.status === 0  && (newStatus === 1 || newStatus === 2)){ //is approving or rejecting

    // TODO Corregir esta condición y hacer más explícito si está aceptando o rechazando.
    // Por ejemplo, enviando yn código especial y no hardcodear los estados.

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
      onlySolicitante(),
      onlyJWTRole("SOLICITANTE_ROLE")
    ], 
    update: [
      onlyAvalInStatus(0),
      onlyAuthenticated(),
      onlySolicitanteOriginal(),
      onlySolicitante(),
      keepStatus()
    ], 
    patch: [
      onlyAuthenticated(),
      onlyAvaldaoCanAccept()
    ],
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