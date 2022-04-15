import dotenv from 'dotenv';
import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import UserController from '@/controllers/user';
import PostController from '@/controllers/post';
import SuggestionController from '@/controllers/suggestion';
import CodeController from '@/controllers/code';
import ViewsController from '@/controllers/views';
import DashboardController from '@/controllers/dashboard';

dotenv.config();
// import const BackupController from '@/controllers/backup
// import const DevEnvironmentController from '@/controllers/DevEnvironment

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static('public'));

// Controllers
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
  .then(() => {})
  .catch((error) => console.log(error));

app.get('/', (req, res) => res.send('oi'));
