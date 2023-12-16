import { body } from 'express-validator';

export const newGenreSchema = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Genre name is required')
    .isLength({ min: 3 })
    .toLowerCase()
    .withMessage('The minimum genre name length should be more than 2'),
];
