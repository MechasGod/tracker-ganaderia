class AppError extends Error {
  constructor(message, statusCode = 500, code = "INTERNAL_ERROR", details = []) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

module.exports = AppError;
