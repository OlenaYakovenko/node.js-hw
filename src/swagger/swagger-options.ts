import { SwaggerOptions } from 'swagger-ui-express';

import swaggerDefinition from './swagger-definition.js';

const swaggerOptions: SwaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/api/*.ts'],
};

export default swaggerOptions;
