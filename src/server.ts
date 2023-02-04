import { Log } from '@/logs/index';
import mongoose from 'mongoose';
import { app } from './app';

const PORT = process.env.PORT || 3333;

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    Log.info('banco conectado!');

    app.listen(PORT);

    Log.info(`Aplicação iniciada ${PORT}`);
  })
  .catch((error) => {
    Log.error('erro ao conectar o banco');

    throw error;
  });
