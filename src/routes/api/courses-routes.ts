import { Router } from 'express';
import { createNewCourse, getAllCourses, updateCourse } from '../../controllers/courses-controller.js';
const coursesRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Course:
 *      properties:
 *        '_id':
 *          type: number
 *          example: 656275a8294b8813d1964dc1
 *        name:
 *          type: string
 *          example: Duis mollit reprehenderit ad
 *        description:
 *          type: string
 *          example: Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.
 *        authors:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              - _id:
 *                  type: number
 *                  example: 656324ecb9559617173719a8
 *                name:
 *                  type: string
 *                  example: Polly Sosa
 *        duration:
 *          type: number
 *          example: 157
 *    Error:
 *       properties:
 *         status:
 *           type: integer
 *         message:
 *           type: string
 * /courses:
 *  get:
 *    summary: Gets all courses from the server
 *    tags:
 *      - courses
 *    responses:
 *      200:
 *        description: Get all courses
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Course'
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
 *    tags:
 *      - courses
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
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
 * /course/{id}:
 *    put:
 *      summary: Update course
 *      tags:
 *        - courses
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: String ID of the course to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                name:
 *                  type: string
 *                  example: Duis mollit reprehenderit ad
 *                description:
 *                  type: string
 *                  example: Est minim ea aute sunt laborum minim eu excepteur. Culpa sint exercitation mollit enim ad culpa aliquip laborum cillum. Dolor officia culpa labore ex eiusmod ut est ea voluptate ea nostrud.
 *                authors:
 *                  type: array
 *                  items:
 *                    type: object
 *                    properties:
 *                      - _id:
 *                          type: number
 *                          example: 656324ecb9559617173719a8
 *                        name:
 *                          type: string
 *                          example: Polly Sosa
 *                duration:
 *                  type: number
 *                  example: 157
 *      responses:
 *        '200':
 *          description: Course updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Course'
 *        '400':
 *          description: Parameter is required
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                status: 400
 *                message: Parameter is required
 *        '404':
 *          description: Page is not found
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                status: 404
 *                message: Can't find this page
 *        '500':
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Error'
 *              example:
 *                status: 500
 *                message: Internal server error
 */

coursesRouter.route('/').get(getAllCourses).post(createNewCourse);
coursesRouter.route('/:id').put(updateCourse);

export { coursesRouter };
