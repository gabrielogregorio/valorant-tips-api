import { PORT } from '@/config/envs';
import { Database } from '@/database/database';
import { Log } from '@/logs/index';
import { app } from './app';

const PORT_API = PORT;

new Database({ verbose: true })
  .connect()
  .then(() => {
    Log.info('db connected');

    app.listen(PORT_API, () => {
      Log.info(`app started in ${PORT_API}`);
    });
  })
  .catch((error) => {
    Log.error('🚨 error on connect db', error);
  });
