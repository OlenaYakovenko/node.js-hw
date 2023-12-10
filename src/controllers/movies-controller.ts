import { NextFunction, Request, Response } from 'express';

import { IMovie, Movie } from '../models/Movie.js';

const getAllMovies = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie: IMovie = await Movie.create({
      title: req.body.title,
      description: req.body.description,
      releaseDate: req.body.releaseDate,
      genre: req.body.genre,
    });
    res.status(201).json(movie);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Movie.updateOne({ _id: req.params.id }, { $set: { ...req.body } }, { new: true, runValidators: true });
    const updatedMovie = await Movie.findById(req.params.id);
    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Movie.deleteOne({ id: req.params.id });
    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

const findMovieByGenre = async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log(req.params);
    const movies = await Movie.find({ genre: req.params.genreName });
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

export { getAllMovies, addMovie, updateMovie, deleteMovie, findMovieByGenre };
