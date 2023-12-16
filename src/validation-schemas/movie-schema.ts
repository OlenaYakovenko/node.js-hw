import { body, param } from 'express-validator';

import { IError } from '../error-handlers/general-error-handler.js';
import { Genre } from '../models/Genre.js';

export const newMovieSchema = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Movie title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Movie title length should be between 3 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Movie description is required')
    .isLength({ min: 30, max: 500 })
    .withMessage('Movie description length should be between 30 and 500 characters'),
  body('releaseDate')
    .trim()
    .notEmpty()
    .withMessage('Movie release date is required')
    .isDate()
    .withMessage('Movie release date should be a date'),
  body('genre').isArray({ min: 1 }).withMessage('Movie genre is required and should be an array of strings'),
];

export const movieGenreSchema = [
  param('genreName')
    .trim()
    .notEmpty()
    .isAlpha()
    .withMessage('Movie genre is invalid')
    .custom(async (value) => {
      const genres = (await Genre.find()).map((genre) => genre.name);
      if (!genres.includes(value)) {
        const error: IError = new Error('Genre not found');
        error.statusCode = 400;
        error.status = 'failed';
        throw error;
      }
    }),
];
