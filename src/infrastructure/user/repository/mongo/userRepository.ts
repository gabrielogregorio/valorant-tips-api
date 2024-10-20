import { UserEntity } from '@/domain/user/entity/user';
import { UserRepositoryInterface } from '@/domain/user/repository/userRepository.interface';
import { User } from './User';

export class UserRepository implements UserRepositoryInterface {
  save = async (user: UserEntity): Promise<UserEntity> => {
    const newUser = new User({
      id: user.id,
      image: user.image,
      password: user.password,
      username: user.username,
    });
    await newUser.save();

    return user;
  };

  update = async (id: string, user: UserEntity) => {
    await User.findOneAndUpdate(
      { id },
      {
        $set: {
          image: user.image,
          password: user.password,
          username: user.username,
        },
      },
      { new: true },
    );
  };

  findById = async (id: string): Promise<UserEntity | null> => {
    const user = await User.findOne({ id });
    if (!user) {
      return null;
    }

    const userEntity = new UserEntity({
      id: user.id,
      password: user.password,
      username: user.username,
    });

    if (user.image) {
      userEntity.changeImage(user.image);
    }

    return userEntity;
  };

  findByIds = async (ids: string[]): Promise<UserEntity[]> => {
    const users = await User.find({ id: { $in: ids } }).exec();

    return users.map((user) => {
      const userEntity = new UserEntity({
        id: user.id,
        password: user.password,
        username: user.username,
      });

      if (user.image) {
        userEntity.changeImage(user.image);
      }

      return userEntity;
    });
  };

  findOneByUsername = async (username: string): Promise<UserEntity | null> => {
    const user = await User.findOne({ username });
    if (!user) {
      return user;
    }

    const userEntity = new UserEntity({
      id: user.id,
      password: user.password,
      username: user.username,
    });

    if (user.image) {
      userEntity.changeImage(user.image);
    }

    return userEntity;
  };

  findOneAndDelete = async (id: string): Promise<void> => {
    await User.findOneAndDelete({ id });
  };

  countDocuments = async (): Promise<number> => User.countDocuments({});
}
