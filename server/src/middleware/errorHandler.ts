import { NextFunction, Request, Response } from "express";
import winston from "winston";
import { CustomError } from "../utils/CustomError.js";

const logger = winston.createLogger({
  level: "error",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: "errors.log" }),
    new winston.transports.Console({ format: winston.format.simple() })
  ]
});

const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode =
    err.statusCode >= 100 && err.statusCode <= 599 ? err.statusCode : 500;

  logger.error({
    message: err.message,
    statusCode,
    stack: err.stack,
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  res.status(statusCode).json({
    success: false,
    error: {
      statusCode,
      message:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : undefined
    },
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
};

export { errorHandler };
