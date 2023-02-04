import { MONGO_URI, PORT } from '@/config/envs';
import { Log } from '@/logs/index';
import mongoose from 'mongoose';
import { app } from './app';

const PORT_API = PORT || 3333;

mongoose
  .connect(MONGO_URI, {})
  .then(() => {
    Log.info('banco conectado!');

    app.listen(PORT_API);

    Log.info(`Aplicação iniciada ${PORT_API}`);
  })
  .catch((error) => {
    Log.error('erro ao conectar o banco');

    throw error;
  });
