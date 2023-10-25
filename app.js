import express from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import {healthCheckRoute} from './src/routes/api/health-check.js';
import {coursesRoute} from './src/routes/api/courses-routes.js'
import { generalErrorHandler } from './src/error-handlers/general-error-handler.js';
import { notFoundHandler } from './src/error-handlers/not-found-handler.js';
import swaggerOptions from './src/swagger/swagger-options.js';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

app.use('/health-check', healthCheckRoute);
app.use('/courses', coursesRoute)
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.all('*', notFoundHandler);

app.use(generalErrorHandler)

app.listen(PORT, ()=>console.log(`Server runs on port ${PORT}`))