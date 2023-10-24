import {courses} from '../models/courses.js';
const data = {
  courses,
  setCourses: function (newCourse) {this.courses = newCourse}

}

const getAllCourses = (req, res) => {
  res.status(200).json(data.courses)
}

const createNewCourse = (req, res) => {
  const newCourse = {
    "id": req.body.id,
    "name": req.body.name,
    "description": req.body.description,
    "authors": req.body.authors,
    "duration": req.body.duration
  }
  if (!newCourse.id)  {
    return res.status(400).json({ 
      status: 'failed',
      message: 'ID is required.' 
    })
  }
  if (!newCourse.name)  {
    return res.status(400).json({ 
      status: 'failed',
      message: 'Course name is required.' 
    })
  }
  if (!newCourse.description)  {
    return res.status(400).json({ 
      status: 'failed',
      message: 'Course description is required.' 
    })
  }
  if (!newCourse.authors)  {
    return res.status(400).json({ 
      status: 'failed',
      message: 'Course authors are required.' 
    })
  }
  if (!newCourse.duration)  {
    return res.status(400).json({ 
      status: 'failed',
      message: 'Course duration is required.' 
    })
  }

  data.setCourses([...data.courses, newCourse])
  res.status(201).json({
    status: 'success',
    message: 'New course is created'
  })
}

export {getAllCourses, createNewCourse}