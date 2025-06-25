import IncorrectRequest from "./IncorrectRequest.js";

class ValidationError extends IncorrectRequest{
  constructor(err){
    const errMessage = Object.values(err.errors)
      .map(err => err.message)
      .join("; ");
    super(`Os seguintes erros foram detectados: ${errMessage}`);
  }
}

export default ValidationError;