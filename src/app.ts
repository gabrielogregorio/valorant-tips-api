import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import DashboardController from '@/controllers/dashboardController';
import ViewsController from '@/controllers/viewsController';
import CodeController from '@/controllers/codeController';
import SuggestionController from '@/controllers/suggestionController';
import path from 'path';
// import const BackupController from '@/controllers/backupController
// import const DevEnvironmentController from '@/controllers/devEnvironmentController
import docbytest from 'docbytest';
import { handleErrors } from '@/middlewares/errors';
import statusCode from '@/config/statusCode';
import { router } from './routes';

const docbytestTest = docbytest(statusCode);

const app: Application = express();

app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

app.use(router);
app.use('/', SuggestionController);
app.use('/', CodeController);
app.use('/', ViewsController);
app.use('/', DashboardController);
// app.use('/', BackupController)
// app.use('/', DevEnvironmentController)

app.use(express.static('public'));
app.get('/docs-json', async (_req, res) => {
  const docs = await docbytestTest;
  return res.json(docs);
});

app.get('/', (_req: Request, res: Response): Response => res.send('api is running'));

app.use('/docs/', express.static(path.join(__dirname, '../node_modules/docbytest-ui/build/')));

app.use(handleErrors);

export { app };
