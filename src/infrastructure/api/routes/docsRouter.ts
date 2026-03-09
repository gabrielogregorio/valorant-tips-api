import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import swaggerUi from 'swagger-ui-express';
import { Router, Request, Response } from 'express';
import { registry } from '../docs/registry';

import './mapsRouter.docs';
import './agentsRouter.docs';
import './authRouter.docs';
import './baseRouter.docs';
import './codeRouter.docs';
import './dashboardRouter.docs';
import './postRouter.docs';
import './postTagCategoryRouter.docs';
import './postTagsRouter.docs';
import './suggestionRouter.docs';
import './userRouter.docs';
import './viewsRouter.docs';

export const docsRouter = Router();

docsRouter.use('/', swaggerUi.serve, async (_req: Request, res: Response) => {
  const generator = new OpenApiGeneratorV3(registry.definitions);

  const swaggerDocument = generator.generateDocument({
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Valorant Tips API',
      description: 'API de Dicas do Valorant',
    },
  });

  return res.send(swaggerUi.generateHTML(swaggerDocument));
});
