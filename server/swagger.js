import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = process.env.PORT || 4040

// Configuración de las opciones de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task Manager API',
      version: '1.0.0',
      description: 'API para gestionar tareas',
    },
    servers: [
        {
            url: `http://localhost:${PORT}/api`, // Desarrollo local
            description: 'Servidor de desarrollo'
          },
          {
            url: 'https://api.miapp.com/api', // Producción
            description: 'Servidor de producción'
          }
    ],
  },
  apis: ['./routes/*.js'], 
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
