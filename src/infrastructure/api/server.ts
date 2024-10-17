import { app } from './app';
import { PORT } from './config/envs';
import { Database } from './database/database';
import { Log } from './logs';

Log.info(`app started in http://localhost:${PORT}`);

new Database({ verbose: true })
  .connect()
  .then(() => {
    Log.info('db connected');

    app.listen(PORT, () => {
      Log.info(`app started in http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    Log.error('🚨 error on connect db', error);
  });
