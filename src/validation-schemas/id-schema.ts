import mongoose from 'mongoose';
import { param } from 'express-validator';
import { IError } from '../error-handlers/general-error-handler.js';

export const idSchema = (model: typeof mongoose.Model) => {
  return [
    param('id')
      .trim()
      .notEmpty()
      .matches(/^[a-f\d]{24}$/i)
      .withMessage(`${model.modelName} id is invalid`)
      .custom(async (value) => {
        const obj = await model.findById(value);
        if (!obj) {
          const error: IError = new Error(`${model.modelName} not found`);
          error.statusCode = 400;
          error.status = 'failed';
          throw error;
        }
      }),
  ];
};
