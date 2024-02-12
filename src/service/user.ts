import { User, IUser } from '@/models/User';

export class UserService {
  async Create({ username, password, image }: IUser): Promise<IUser> {
    const newUser = new User({ username, password, image });
    await newUser.save();
    return newUser;
  }

  async FindByIdAndUpdate(id: string, { username, password, image }: IUser) {
    const update: any = {};
    const passwordHasChanged = password !== '' && password !== undefined && password !== null;
    const usernameHasChanged = username !== '' && username !== undefined && username !== null;
    const imageHasChanged = image !== undefined && image !== '';

    if (passwordHasChanged) {
      update.password = password;
    }

    if (usernameHasChanged) {
      update.username = username;
    }

    if (imageHasChanged) {
      update.image = image;
    }

    return User.findOneAndUpdate({ _id: id }, { $set: update });
  }

  async FindById(id: string): Promise<IUser> {
    return User.findById(id);
  }

  async UserExistsByUsername(username: string, id: string): Promise<IUser> {
    const user: IUser = await User.findOne({ username });

    if (user === null) {
      return undefined;
    }
    // @ts-ignore
    if (user._id.toString() === id) {
      return undefined;
    }

    return user;
  }

  async FindByUsername(username: string): Promise<IUser> {
    const user = await User.find({ username });
    return user[0];
  }

  async DeleteById(id: string) {
    return User.findOneAndDelete({ _id: id });
  }
}
