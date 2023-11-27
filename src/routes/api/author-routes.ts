import { Router } from 'express';
import { addAuthor, getAllAuthors } from '../../controllers/author-controller.js';

/**
 * @swagger
 * components:
 *  schemas:
 *    Author:
 *      properties:
 *        '_id':
 *          type: string
 *        name:
 *          type: string
 *        '__v':
 *          type: number
 *    Error:
 *      properties:
 *        status:
 *          type: integer
 *        message:
 *          type: string
 * /authors:
 *  get:
 *    summary: Get authors from the server
 *    tags:
 *      - authors
 *    responses:
 *      200:
 *        description: Get all authors
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Author'
 *              example:
 *               - '_id': 655bdf51262d46ec397a63dc
 *                 name: John Doeson
 *                 '__v': 0
 *      404:
 *        description: Page is not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 404
 *              message: Can't find this page
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 500
 *              message: Internal server error
 *  post:
 *    summary: Create new author
 *    tags:
 *      - authors
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: New author name
 *                example: Mat Simpson
 *    responses:
 *      201:
 *        description: New author created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *              example:
 *                "_id": 655bdf51262d46ec397a63dc
 *                name: Mat Simpson
 *                "__v": 0
 *      400:
 *        description: Parameter is required
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 400
 *              message: Parameter is required
 *      404:
 *        description: Page is not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 404
 *              message: Can't find this page
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 500
 *              message: Internal server error
 */
export const authorRouter = Router();
authorRouter.route('/').get(getAllAuthors).post(addAuthor);
