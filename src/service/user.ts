import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { DataUser } from '@/factories/dataUser';
import { IUser } from '@/interfaces/user';
import { UserRepository } from '@/repositories/userRepository';
import bcrypt from 'bcrypt';

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  create = async ({ username, password, image }: IUser): Promise<IUser> =>
    this.userRepository.create({ username, password, image });

  async createPasswordHash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return hash;
  }

  findByIdAndUpdate = async (id: string, { username, password, image }: Partial<IUser>) => {
    const update: Partial<IUser> = {};

    if (password) {
      update.password = password;
    }

    if (username) {
      update.username = username;
    }

    if (image) {
      update.image = image;
    }

    return this.userRepository.findOneAndUpdate(id, update);
  };

  updateUser = async ({
    id,
    username,
    image,
    password,
  }: {
    id: string;
    username?: string;
    image?: string;
    password?: string;
  }) => {
    const user = await this.findById(id);

    if (user === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    let payloadUpdateUser: Partial<IUser> = {};

    if (username) {
      const userFounded = await this.findOneByUsername(username);
      if (userFounded === null || userFounded._id?.toString() === id) {
        payloadUpdateUser = {
          ...payloadUpdateUser,
          username,
        };
      } else {
        throw new AppError(errorStates.CONFLICT_ALREADY_EXISTS);
      }
    }

    if (password) {
      payloadUpdateUser = {
        ...payloadUpdateUser,
        password: await this.createPasswordHash(password),
      };
    }

    if (image) {
      payloadUpdateUser = {
        ...payloadUpdateUser,
        image,
      };
    }

    const userUpdated = await this.findByIdAndUpdate(id, payloadUpdateUser);
    return DataUser.Build(userUpdated);
  };

  findById = async (id: string): Promise<IUser | null> => this.userRepository.findById(id);

  findOneByUsername = async (username: string): Promise<IUser | null> =>
    this.userRepository.findOneByUsername(username);

  deleteById = async (id: string) => this.userRepository.findOneAndDelete(id);
}
