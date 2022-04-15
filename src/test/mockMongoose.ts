import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connection = mongoose;

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => null)
  .catch((error) => error);
