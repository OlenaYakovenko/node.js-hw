import { Request, Response, NextFunction } from 'express';

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
    await Genre.updateOne({ _id: req.params.id }, { $set: { ...req.body } }, { runValidators: true });
    const updatedGenre = await Genre.findById(req.params.id);
    res.status(200).json(updatedGenre);
  } catch (error) {
    next(error);
  }
};

const deleteGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Genre.deleteOne({ id: req.params.id });
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

export { getAllGenres, addGenre, updateGenre, deleteGenre };
