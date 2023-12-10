import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { IError } from '../error-handlers/general-error-handler.js';

export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error: IError = new Error(errors.array()[0].msg);
    error.statusCode = 400;
    error.status = 'failed';
    throw error;
  }
  next();
};
