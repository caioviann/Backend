import BaseError from "./BaseError.js";

class IncorrectRequest extends BaseError {
  constructor(message = "Um ou mais dados estão incorretos"){
    super(message, 400);
  }
}

export default IncorrectRequest;