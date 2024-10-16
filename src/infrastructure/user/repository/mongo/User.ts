import mongoose from 'mongoose';
import { IUser } from 'src/interfaces/user';

const userSchema = new mongoose.Schema<IUser>(
  {
    username: { type: String, unique: true, required: true }, // expand use
    password: String,
    image: String,
  },
  {
    timestamps: true,
    id: true,
  },
);
userSchema.virtual('id').get(function () {
  return this._id;
});

export const User = mongoose.model<IUser>('User', userSchema);
