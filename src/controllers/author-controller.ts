import { NextFunction, Request, Response } from 'express';

import { IError } from '../error-handlers/general-error-handler.js';
import { Author, IAuthor } from '../models/Course.js';

const getAllAuthors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authors = await Author.find();
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const addAuthor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.name) {
      const error: IError = new Error('Author name is required');
      error.statusCode = 400;
      error.status = 'failed';
    }
    const newAuthor: IAuthor = await Author.create({ name: req.body.name });
    res.status(200).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

export { getAllAuthors, addAuthor };
