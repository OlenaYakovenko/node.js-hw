import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import 'dotenv/config';

import { healthCheckRoute } from './routes/api/health-check.js';
import { coursesRouter } from './routes/api/courses-routes.js';
import { moviesRouter } from './routes/api/movies-routes.js';
import { generalErrorHandler } from './error-handlers/general-error-handler.js';
import { notFoundHandler } from './error-handlers/not-found-handler.js';
import swaggerOptions from './swagger/swagger-options.js';
import connectDB from './config/db.js';
import { genresRouter } from './routes/api/genre-routes.js';
import { authorRouter } from './routes/api/author-routes.js';

connectDB();

const swaggerSpec: SwaggerUiOptions = swaggerJSDoc(swaggerOptions);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/health-check', healthCheckRoute);
app.use('/courses', coursesRouter);
app.use('/authors', authorRouter);
app.use('/movies', moviesRouter);
app.use('/genres', genresRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.all('*', notFoundHandler);
app.use(generalErrorHandler);

app.listen(PORT, () => console.log(`Server runs on port ${PORT}`));
