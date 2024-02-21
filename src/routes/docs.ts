import express, { Router, Request, Response } from 'express';
import docbytest from 'docbytest';
import statusCode from '@/config/statusCode';
import path from 'path';

const docRouter = docbytest(statusCode);

export const docsRouter: Router = express.Router();

docsRouter.use('/docs/', express.static(path.join(__dirname, '../../node_modules/docbytest-ui/build/')));

docsRouter.get('/docs-json', async (_req: Request, res: Response) => {
  const docs = await docRouter;
  return res.json(docs);
});
