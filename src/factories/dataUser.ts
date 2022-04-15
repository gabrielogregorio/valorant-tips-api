export type factoryUserType = {
  username: string;
  image: string;
};

export class DataUser {
  static Build(user: any): factoryUserType {
    if (!user) {
      return null;
    }

    return {
      username: user?.username,
      image: user?.image,
    };
  }
}
