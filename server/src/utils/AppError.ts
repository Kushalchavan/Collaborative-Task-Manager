export class AppError extends Error {
  statusCode: number;
  isOperatinal: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperatinal = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
