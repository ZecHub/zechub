// swagger.js
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { authPaths } from './swagger/auth.swagger.js';
import { campaignPaths } from './swagger/campaigns.swagger.js';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Authentication API',
      version: '1.0.0',
      description: 'User authentication and session management API',
    },
    servers: [
      { url: 'http://localhost:3000', description: 'Development server' },
      { url: 'http://64.23.230.199:3000', description: 'Production server' },
    ],
    paths: {...authPaths , ...campaignPaths}, // Add the paths here
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid',
          description: 'Session cookie authentication'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            discord_id: { type: 'string', example: '123456789012345678' },
            username: { type: 'string', example: 'john_doe#1234' },
            avatar: { type: 'string', example: 'a_abc123def456' }
          }
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            user: { $ref: '#/components/schemas/User' }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: false },
            error: { type: 'string', example: 'Not authenticated' }
          }
        },
        LogoutResponse: {
          type: 'object',
          properties: {
            success: { type: 'boolean', example: true },
            message: { type: 'string', example: 'Logged out successfully' }
          }
        }
      }
    },
    security: [{ cookieAuth: [] }]
  },
  apis: [], // Remove the apis array since we're defining paths manually
};

const specs = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
};

export default setupSwagger;