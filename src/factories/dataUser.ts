import { IUser } from '@/interfaces/user';

export type factoryUserType = {
  username: string;
  image: string;
};

export class DataUser {
  static Build(user: IUser | null): factoryUserType {
    if (!user) {
      return null;
    }

    return {
      username: user?.username,
      image: user?.image,
      password: user.password,
    };
  }
}
