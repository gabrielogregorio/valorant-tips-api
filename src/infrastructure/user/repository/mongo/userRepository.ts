import { UserEntity } from '../../../../domain/user/entity/user';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { User } from './User';

export class UserRepository implements UserRepositoryInterface {
  save = async (user: UserEntity): Promise<UserEntity> => {
    const newUser = new User(user);
    await newUser.save();

    return user;
  };

  update = async (id: string, user: Partial<UserEntity>) => {
    await User.findOneAndUpdate({ id }, { $set: user }, { new: true });
  };

  findById = async (id: string): Promise<UserEntity | null> => User.findById(id);

  findOneByUsername = async (username: string): Promise<UserEntity | null> => User.findOne({ username });

  findOneAndDelete = async (id: string): Promise<void> => {
    await User.findOneAndDelete({ id });
  };

  countDocuments = async (): Promise<number> => User.countDocuments({});
}
