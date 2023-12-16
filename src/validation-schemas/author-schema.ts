import { body } from 'express-validator';

export const newAuthorSchema = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Author name is required')
    .isAlpha()
    .isLength({ min: 10 })
    .toLowerCase()
    .withMessage('The minimum genre name length should be more than 10'),
];
