import { Router } from 'express';

import { validateRequest } from '../../middleware/validate-request.js';
import {
  addMovie,
  deleteMovie,
  findMovieByGenre,
  getAllMovies,
  updateMovie,
} from '../../controllers/movies-controller.js';
import { movieGenreSchema, newMovieSchema } from '../../validation-schemas/movie-schema.js';
import { idSchema } from '../../validation-schemas/id-schema.js';
import { Movie } from '../../models/Movie.js';

const moviesRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Movie:
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         releaseDate:
 *           type: string
 *           format: date-time
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *         __v:
 *           type: number
 *     Error:
 *       properties:
 *         status:
 *           type: integer
 *         message:
 *           type: string
 * /movies:
 *  get:
 *    summary: Get movies from the server
 *    tags:
 *      - movies
 *    responses:
 *      '200':
 *        description: Get all movies
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Movie'
 *            example:
 *              - '_id': 655bdf51262d46ec397a63dc
 *                title: Test title
 *                description: Test description
 *                releaseDate: 2022-11-15T00:00:00.000Z
 *                genre: [drama]
 *                '__v': 0
 *      '404':
 *        description: Page is not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 404
 *              message: Can't find this page
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 500
 *              message: Internal server error
 *  post:
 *    summary: Creats a new movie
 *    tags:
 *      - movies
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              releaseDate:
 *                type: string
 *                format: date-time
 *              genre:
 *                type: array
 *                items:
 *                  type: string
 *    responses:
 *      '201':
 *        description: New movie added
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *      '400':
 *        description: Parameter is required
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 400
 *              message: Parameter is required
 *      '404':
 *        description: Page is not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 404
 *              message: Can't find this page
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 500
 *              message: Internal server error
 * /movies/{id}:
 *    put:
 *      summary: Update movie
 *      tags:
 *        - movies
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: String ID of the movie to update
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                  description: New movie name
 *                description:
 *                  type: string
 *                releaseDate:
 *                  type: string
 *                  format: date-time
 *                genre:
 *                  type: array
 *                  items:
 *                    type: string
 *      responses:
 *        '200':
 *          description: Movie updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Movie'
 *              example:
 *                '_id': 655bdf51262d46ec397a63dc
 *                title: Test title
 *                description: Test description
 *                releaseDate: 2022-11-15T00:00:00.000Z
 *                genre: [drama]
 *                '__v': 0
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
 *    delete:
 *      summary: Delete movie
 *      tags:
 *        - movies
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          required: true
 *          description: String ID of the movie to delete
 *      responses:
 *        '200':
 *          description: Movie deleted
 *          content:
 *            application/json:
 *              schema:
 *                type: string
 *                example: 655bdf51262d46ec397a63af
 *        '400':
 *          description: Parameter is required
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/Schemas/Error'
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
 * /movies/genre/{genreName}:
 *  get:
 *    summary: Gets movies by the genre name
 *    tags:
 *      - movies
 *    parameters:
 *      - in: path
 *        name: genreName
 *        schema:
 *          type: string
 *        required: true
 *        description: Name of the genre to get movie by
 *    responses:
 *      '200':
 *        description: Get all movies by the provided genre
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Movie'
 *            example:
 *              '_id': 655bdf51262d46ec397a63dc
 *              title: Test title
 *              description: Test description
 *              releaseDate: 2022-11-15T00:00:00.000Z
 *              genre: [drama]
 *              '__v': 0
 *      '404':
 *        description: Page is not found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 404
 *              message: Can't find this page
 *      '500':
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Error'
 *            example:
 *              status: 500
 *              message: Internal server error
 */

moviesRouter.route('/').get(getAllMovies).post(newMovieSchema, validateRequest, addMovie);
moviesRouter
  .route('/:id')
  .delete(idSchema(Movie), validateRequest, deleteMovie)
  .put(idSchema(Movie), newMovieSchema, validateRequest, updateMovie);
moviesRouter.route('/genre/:genreName').get(movieGenreSchema, validateRequest, findMovieByGenre);

export { moviesRouter };
