import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import DashboardController from '@/controllers/dashboardController';
import UserController from '@/controllers/userController';
import ViewsController from '@/controllers/viewsController';
import CodeController from '@/controllers/codeController';
import SuggestionController from '@/controllers/suggestionController';
import PostController from '@/controllers/postController';
import path from 'path';
// import const BackupController from '@/controllers/backupController
// import const DevEnvironmentController from '@/controllers/devEnvironmentController
import docbytest from 'docbytest';
import statusCode from './config/statusCode';

dotenv.config();

export const app: Application = express();
app.disable('x-powered-by');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

app.use('/', UserController);
app.use('/', PostController);
app.use('/', SuggestionController);
app.use('/', CodeController);
app.use('/', ViewsController);
app.use('/', DashboardController);
// app.use('/', BackupController)
// app.use('/', DevEnvironmentController)

app.get('/docs-json', async (req, res) => res.json(await docbytest(statusCode)));

app.get('/docs', (_req, res) => {
  res.sendFile(path.join(__dirname, '../node_modules/docbytest-ui/build', 'index.html'));
});
app.use('/docs/static', express.static(path.join(__dirname, '../node_modules/docbytest-ui/build/static/')));
app.use(
  '/docs/manifest.json',
  express.static(path.join(__dirname, '../node_modules/docbytest-ui/build/manifest.json')),
);
app.use('/docs/favicon.ico', express.static(path.join(__dirname, '../node_modules/docbytest-ui/build/favicon.ico')));

app.get('/', (_req: Request, res: Response): Response => res.send('api is running'));
