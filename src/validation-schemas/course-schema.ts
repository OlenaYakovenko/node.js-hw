import { body } from 'express-validator';

export const newCourseSchema = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Course name is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Course name length should be between 3 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Course description is required')
    .isLength({ min: 30, max: 500 })
    .withMessage('Course description length should be between 30 and 500 characters'),
  body('authors').isArray({ min: 1 }).withMessage('Course authors required and should be an array of authors IDs'),
  body('authors.*').isMongoId().withMessage('Course authors should be authors IDs'),
  body('duration')
    .trim()
    .notEmpty()
    .withMessage('Course duration is required')
    .isNumeric()
    .withMessage('Course duration should be a number'),
];
