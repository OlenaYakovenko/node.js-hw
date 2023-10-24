import { Router } from "express";
import { createNewCourse, getAllCourses } from "../../controllers/courses-controller.js";
const coursesRoute = Router();

/**
 * @swagger
 * /courses:
 *  get:
 *    summary: Check connection to the server
 *    responses:
 *      200:
 *        description: Get all courses
 *        content: 
 *          application/json:
 *            schema:
 *              type: array
 *              items: 
 *                type: object
 *                properties: 
 *                  id:
 *                    type: number
 *                    example: 8693
 *                  name:
 *                    type: string
 *                    example: Duis mollit reprehenderit ad
 *                  description:
 *                    type: string
 *                    example: Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.
 *                  authors:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties: 
 *                        id: 
 *                          type: number
 *                          example: 1370
 *                        name: 
 *                          type: string
 *                          example: Polly Sosa
 *                  duration:
 *                    type: number
 *                    example: 157
 *      404:
 *        description: Page is not found
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                status:
 *                  type: string
 *                  example: 404
 *                message: 
 *                  type: string
 *                  example: Can't find this page
 *      500:
 *        description: Internal server error
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                status:
 *                  type: string
 *                  example: 500
 *                message: 
 *                  type: string
 *                  example: Internal server error
 *  post:
 *    summary: Create new course
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              id:
 *                type: number
 *                description: New course ID
 *                example: 1000
 *              name:
 *                type: string
 *                description: New course name
 *                example: NodeJS course
 *              description:
 *                type: string
 *                description: description of the course
 *                example: Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.
 *              authors:
 *                type: array
 *                description: New course authors
 *                items:
 *                  type: object
 *                  properties: 
 *                    id: 
 *                      type: number
 *                      example: 1370
 *                    name: 
 *                      type: string
 *                      example: Polly Sosa
 *              duration:
 *                type: number
 *                description: New course duration
 *                example: 157
 *    responses:
 *      201:
 *        description: New course created
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                status:
 *                  type: string
 *                  example: success
 *                message:
 *                  type: string
 *                  example: New course is created
 *      400:
 *        description: Parameter is required
 *        content:
 *          application/json: 
 *            schema: 
 *              type: object
 *              properties: 
 *                status:
 *                  type: string
 *                  example: 400
 *                message: 
 *                  type: string
 *                  example: Parameter is required
 *      404:
 *        description: Page is not found
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                status:
 *                  type: string
 *                  example: 404
 *                message: 
 *                  type: string
 *                  example: Can't find this page
 *      500:
 *        description: Internal server error
 *        content: 
 *          application/json:
 *            schema: 
 *              type: object
 *              properties: 
 *                status:
 *                  type: string
 *                  example: 500
 *                message: 
 *                  type: string
 *                  example: Internal server error
 */

coursesRoute.route('/')
  .get(getAllCourses)
  .post(createNewCourse)

export {coursesRoute}