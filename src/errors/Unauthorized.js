class UnauthorizedError extends Error{
  constructor(message){
    super(message);
    this.name = "Unauthorized";
    this.code = 401;
  }

}


module.exports = UnauthorizedError;
