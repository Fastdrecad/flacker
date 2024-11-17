export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
    // Podešavanje prototipa za pravilno ponašanje u TypeScript-u
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
