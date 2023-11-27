import { NextFunction, Request, Response } from 'express';

import { Course, ICourse } from '../models/Course.js';
import { IError } from '../error-handlers/general-error-handler.js';

const getAllCourses = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    next(error);
  }
};

const createNewCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.body.name) {
      const error: IError = new Error('Course name is required.');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    if (!req.body.description) {
      const error: IError = new Error('Course description is required.');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    if (!req.body.authors) {
      const error: IError = new Error('Course authors field is required.');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    if (!req.body.duration) {
      const error: IError = new Error('Course duration is required.');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    const newCourse: ICourse = await Course.create({
      name: req.body.name,
      description: req.body.description,
      authors: req.body.authors,
      duration: req.body.duration,
    });
    res.status(201).json(newCourse);
  } catch (error) {
    next(error);
  }
};

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      const error: IError = new Error('Course is not found');
      error.statusCode = 400;
      error.status = 'failed';
      throw error;
    }
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true, runValidators: true },
    );
    res.status(200).json(updatedCourse);
  } catch (error) {
    next(error);
  }
};

export { getAllCourses, createNewCourse, updateCourse };
