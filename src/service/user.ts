import { User, IUser } from '@/models/User';

export class UserService {
  static async Create({ username, password, image }: IUser): Promise<IUser> {
    const newUser = new User({ username, password, image });
    await newUser.save();
    return newUser;
  }

  static async FindByIdAndUpdate(id: string, { username, password, image }: IUser) {
    const update: any = {};
    // Senha foi alterada
    if (password !== '' && password !== undefined && password !== null) {
      update.password = password;
    }
    // Username foi alterado
    if (username !== '' && username !== undefined && username !== null) {
      update.username = username;
    }

    if (image !== undefined && image !== '') {
      update.image = image;
    }

    const user = await User.findOneAndUpdate({ _id: id }, { $set: update });
    return user;
  }

  static async FindById(id: string): Promise<IUser> {
    const user = await User.findById(id);
    return user;
  }

  static async UserExistsByUsername(username, id) {
    const user = await User.findOne({ username });

    if (user === null) {
      return undefined;
    }
    // eslint-disable-next-line no-underscore-dangle
    if (user._id.toString() === id) {
      return undefined;
    }

    return user;
  }

  static async FindByUsername(username: string): Promise<IUser> {
    const user = await User.find({ username });
    return user[0];
  }

  static async DeleteById(id: string) {
    const userDeleted = await User.findOneAndDelete({ _id: id });
    return userDeleted;
  }
}
