import { IUser } from '@/interfaces/user';
import { UserRepository } from '@/repositories/userRepository';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  create = async ({ username, password, image }: IUser): Promise<IUser> =>
    this.userRepository.create({ username, password, image });

  findByIdAndUpdate = async (id: string, { username, password, image }: IUser) => {
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

    return this.userRepository.findOneAndUpdate(id, update);
  };

  findById = async (id: string): Promise<IUser | null> => this.userRepository.findById(id);

  userExistsByUsername = async (username: string, id: string): Promise<IUser | null> => {
    const user = await this.userRepository.findOneByUsername(username);

    if (user === null) {
      return undefined;
    }
    // @ts-ignore
    if (user._id.toString() === id) {
      return undefined;
    }

    return user;
  };

  findByUsername = async (username: string): Promise<IUser> => {
    const user = await this.userRepository.findOneByUsername(username);
    return user[0];
  };

  deleteById = async (id: string) => this.userRepository.findOneAndDelete(id);
}
