import mongoose from 'mongoose';
import { IUser } from '../../../api/interfaces/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    id: {
      type: String,
      unique: true,
    },
    username: { type: String, unique: true, required: true }, // expand use
    password: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>('User', userSchema);
