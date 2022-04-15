import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import DashboardController from '@/controllers/dashboardController';
import UserController from '@/controllers/userController';
import ViewsController from '@/controllers/viewsController';
import CodeController from '@/controllers/codeController';
import SuggestionController from '@/controllers/suggestionController';
import PostController from '@/controllers/postController';
// import const BackupController from '@/controllers/backupController
// import const DevEnvironmentController from '@/controllers/devEnvironmentController

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

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => null)
  .catch((error) => error);

app.get('/', (_req: Request, res: Response): Response => res.send('oi'));
