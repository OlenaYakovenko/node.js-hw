import { Request, Response, NextFunction } from 'express';
import { IError } from '../error-handlers/general-error-handler.js';
import { Genre } from '../models/Genre.js';

const getAllGenres = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    next(error);
  }
};

const addGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.name) {
      const error: IError = new Error('Genre name is required.');
      error.statusCode = 400;
      throw error;
    }
    const genre = await Genre.create({
      name: req.body.name,
    });
    res.status(200).json(genre);
  } catch (error) {
    next(error);
  }
};

const updateGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      const error: IError = new Error('Genre not found');
      error.statusCode = 400;
      throw error;
    }
    await Genre.updateOne({ _id: req.params.id }, { $set: { ...req.body } }, { runValidators: true });
    const updatedGenre = await Genre.findById(req.params.id);
    res.status(200).json(updatedGenre);
  } catch (error) {
    next(error);
  }
};

const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const genre = await Genre.findById(req.params.id);
    if (!genre) {
      const error: IError = new Error('Genre not found');
      error.statusCode = 400;
      throw error;
    }
    await genre.deleteOne();
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export { getAllGenres, addGenre, updateGenre, deleteGenre };
