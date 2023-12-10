import { NextFunction, Request, Response } from 'express';

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
    const newAuthor: IAuthor = await Author.create({ name: req.body.name });
    res.status(200).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

export { getAllAuthors, addAuthor };
