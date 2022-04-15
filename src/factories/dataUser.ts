export class DataUser {
  static Build(user) {
    if (!user) {
      return {};
    }

    return {
      username: user.username,
      image: user.image,
    };
  }
}
