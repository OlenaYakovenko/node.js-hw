import { NextFunction, Request, Response } from 'express';

import { Course, ICourse } from '../models/Course.js';

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
