class AppError extends Error {
  constructor(message, statusCode, errors = []) {
    super(message);

    this.name = this.constructor.name; // Optional, clean name in stack trace
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.errors = errors;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
