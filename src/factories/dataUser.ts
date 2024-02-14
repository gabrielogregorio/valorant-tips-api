import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { IUser } from '@/interfaces/user';

export type factoryUserType = {
  username: string;
  image: string;
};

export class DataUser {
  static Build(user: IUser | null): factoryUserType {
    if (!user) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return {
      username: user?.username,
      image: user?.image,
    };
  }
}
