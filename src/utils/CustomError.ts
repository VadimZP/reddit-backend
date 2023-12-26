
class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomError;