class ForbiddenError extends Error{
  constructor(message){
    super(message);
    this.name = "Forbidden";
    this.code = 403
  }
  
}
module.exports = ForbiddenError;