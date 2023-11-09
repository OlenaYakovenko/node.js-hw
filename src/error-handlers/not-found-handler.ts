import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line
  const err = new Error(`Can't find this page`) as any;
  err.status = 'fail';
  err.statusCode = 404;
  next(err);
};
