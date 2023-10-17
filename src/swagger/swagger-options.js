import swaggerDefinition from './swagger-definition.js'
const swaggerOptions = {
  swaggerDefinition,
  apis: ['./src/routes/api/*.js']
}

export default swaggerOptions