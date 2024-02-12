import { PORT } from '@/config/envs';
import { Database } from '@/database/database';
import { Log } from '@/logs/index';
import { app } from './app';

const PORT_API = PORT || 3333;

new Database({ verbose: true })
  .connect()
  .then(() => {
    Log.info('banco conectado!');

    app.listen(PORT_API);

    Log.info(`Aplicação iniciada ${PORT_API}`);
  })
  .catch((error) => {
    Log.error('erro ao conectar o banco', error);
  });
