import mongoose, { Schema } from 'mongoose';
import { IUser } from 'src/interfaces/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    // @ts-ignore
    _id: { type: Schema.Types.ObjectId, alias: 'id' },
    username: { type: String, unique: true, required: true }, // expand use
    password: String,
    image: String,
  },
  {
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>('User', userSchema);
