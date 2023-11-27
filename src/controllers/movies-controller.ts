import { NextFunction, Request, Response } from 'express';
import { IError } from '../error-handlers/general-error-handler.js';

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
    if (!req.body.title) {
      const error: IError = new Error('Movie title is required.');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    if (!req.body.description) {
      const error: IError = new Error('Movie description is required.');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    if (!req.body.releaseDate) {
      const error: IError = new Error('Please, enter the release date');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    if (!req.body.genre) {
      const error: IError = new Error('Please, enter movie genre');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
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
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      const error: IError = new Error('Movie not found');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    await Movie.updateOne({ _id: req.params.id }, { $set: { ...req.body } }, { new: true, runValidators: true });
    const updatedMovie = await Movie.findById(req.params.id);
    res.status(200).json(updatedMovie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      const error: IError = new Error('Movie not found');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    await movie.deleteOne();
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
