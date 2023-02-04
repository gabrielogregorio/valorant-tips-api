import mongoose from 'mongoose';
import { MONGO_URI } from '@/config/envs';

export const connection = mongoose;

mongoose
  .connect(MONGO_URI, {})
  .then(() => null)
  .catch((error) => error);
