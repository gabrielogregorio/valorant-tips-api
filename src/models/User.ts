import mongoose from 'mongoose';
import { IUser } from 'src/interfaces/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: String,
    password: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>('User', userSchema);
