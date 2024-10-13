import mongoose from 'mongoose';
import { MONGO_URI } from '@/config/envs';
import { Log } from '@/logs/index';

export class Database {
  verbose: boolean;

  constructor({ verbose }: { verbose: boolean }) {
    this.verbose = verbose;
    mongoose.set('strictQuery', false);
  }

  private async mongoConnect(uri: string) {
    return mongoose
      .connect(uri, {})
      .then(() => {
        if (this.verbose) {
          Log.info('db connected');
        }
      })
      .catch((error) => {
        if (this.verbose) {
          Log.error('error on connect db', error);
        }
        throw error;
      });
  }

  public async connect() {
    await this.mongoConnect(MONGO_URI);
  }

  public async e2eTestConnect() {
    await this.mongoConnect(MONGO_URI);
  }

  public async close() {
    await mongoose.connection.close();
  }

  public async e2eDrop() {
    await mongoose.connection.db.dropDatabase();

    this.close();
  }
}
