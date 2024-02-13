import mongoose from 'mongoose';
import { IUser } from 'src/interfaces/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, unique: true, required: true },
    password: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>('User', userSchema);
