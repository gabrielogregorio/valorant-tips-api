import '@/infrastructure/config/i18nTranslate';
import { app } from './app';
import { PORT } from './config/envs';
import { Database } from './database/database';
import { Log } from './logs';

Log.info(`App: app started in http://localhost:${PORT}`);

new Database({ verbose: true })
  .connect()
  .then(() => {
    Log.info('App: db connected');

    app.listen(PORT, () => {
      Log.info(`App: app started in http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    Log.error('App: 🚨 error on connect db', error);
  });
