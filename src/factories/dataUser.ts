import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { IUser } from '@/interfaces/user';

export type factoryUserType = {
  username: string;
  id?: string;
  image?: string;
};

export class DataUser {
  static Build(user: IUser | null, options?: { returnUserId: boolean }): factoryUserType {
    if (!user) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    const image = user?.image ? { image: user?.image } : {};

    return {
      ...image,
      username: user?.username,
      ...(options?.returnUserId ? { id: user._id?.toString() } : {}),
    };
  }
}
