import mongoose from 'mongoose';

export interface IUser {
  username: string;
  password: string;
  image: string;
}

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
