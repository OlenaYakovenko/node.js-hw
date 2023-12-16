import { ErrorRequestHandler } from 'express';

export interface IError extends Error {
  statusCode?: number;
  status?: string;
}

export const generalErrorHandler: ErrorRequestHandler = (error: IError, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
  next(error);
};
