import express from 'express';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { caseRoutes } from './routes/caseRoutes';
import { comparisonRoutes } from './routes/comparisonRoutes';
import { chatRoutes } from './routes/chatRoutes';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Case Comparison API',
      version: '1.0.0',
      description: 'API for comparing cases using OpenAI',
    },
    servers: [
      {
        url: '/',
      },
    ],
  },
  apis: [path.join(__dirname, './routes/*.ts')],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use('/api/cases', caseRoutes);
app.use('/api/comparisons', comparisonRoutes);
app.use('/api/chats', chatRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 