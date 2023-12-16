import { Router } from 'express';

import { addGenre, deleteGenre, getAllGenres, updateGenre } from '../../controllers/genre-controller.js';
import { validateRequest } from '../../middleware/validate-request.js';
import { Genre } from '../../models/Genre.js';
import { newGenreSchema } from '../../validation-schemas/genre-schema.js';
import { idSchema } from '../../validation-schemas/id-schema.js';

export const genresRouter = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *    Genre:
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
 * /genres:
 *  get:
 *    summary: Get genres from the server
 *    tags:
 *      - genres
 *    responses:
 *      200:
 *        description: Get all genres
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Genre'
 *              example:
 *               - '_id': 655bdf51262d46ec397a63dc
 *                 name: comedy
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
 *    summary: Create new genre
 *    tags:
 *      - genres
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: New genre name
 *                example: drama
 *    responses:
 *      201:
 *        description: New genre created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Genre'
 *              example:
 *                "_id": 655bdf51262d46ec397a63dc
 *                name: drama
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
 * /genres/{id}:
 *  put:
 *    summary: Updates genre
 *    tags:
 *      - genres
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: String ID of the genre to update
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                description: New genre name
 *                example: drama
 *    responses:
 *      200:
 *        description: Genre updated
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Genre'
 *              example:
 *                '_id': 655bdf51262d46ec397a63dc
 *                name: drama
 *                '__v': 0
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
 *  delete:
 *    summary: Delete genre
 *    tags:
 *      - genres
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: String ID of the genre to delete
 *    responses:
 *      200:
 *        description: Genre deleted
 *        content:
 *          application/json:
 *            schema:
 *              type: string
 *              example: 655bdf51262d46ec397a63af
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

genresRouter.route('/').get(getAllGenres).post(newGenreSchema, validateRequest, addGenre);
genresRouter
  .route('/:id')
  .delete(idSchema(Genre), validateRequest, deleteGenre)
  .put(idSchema(Genre), newGenreSchema, validateRequest, updateGenre);
