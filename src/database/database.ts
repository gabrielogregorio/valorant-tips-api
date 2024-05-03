import mongoose from 'mongoose';
import { MONGO_URI } from '@/config/envs';
import { Log } from '@/logs/index';

export class Database {
  mongoose: typeof mongoose;

  verbose: boolean;

  constructor({ verbose }: { verbose: boolean }) {
    this.mongoose = mongoose;
    this.verbose = verbose;
    this.mongoose.set('strictQuery', false);
  }

  private async mongoConnect(uri: string) {
    return this.mongoose
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
    await this.mongoose.connection.close();
  }

  public async e2eDrop() {
    await this.mongoose.connection.db.dropDatabase();
  }
}
