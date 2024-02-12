/* eslint-disable import/no-restricted-paths */
import { IUser } from '@/interfaces/user';
import { User } from '@/models/User';

export class UserRepository {
  create = async (user: IUser): Promise<IUser> => {
    const newUser = new User(user);
    await newUser.save();
    return newUser;
  };

  findOneAndUpdate = async (id: string, user: Partial<IUser>) => User.findOneAndUpdate({ _id: id }, { $set: user });

  findById = async (id: string): Promise<IUser | null> => User.findById(id);

  findOneByUsername = async (username: string): Promise<IUser | null> => User.findOne({ username });

  findOneAndDelete = async (id: string) => User.findOneAndDelete({ _id: id });

  countDocuments = async () => User.countDocuments({});
}
