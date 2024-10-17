import { PasswordHasherInterface } from '../../../../domain/services/PasswordHasherInterface';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { AppError } from '../../../errors/AppError';
import { UpdateUserUseCaseDto, UpdateUserUseCaseInterface } from './UpdateUserUseCaseInterface';

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private passwordHasher: PasswordHasherInterface,
  ) {}

  execute = async (id: string, { username, password, image }: UpdateUserUseCaseDto): Promise<void> => {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      throw new AppError('USER_NOT_FOUND');
    }

    if (username) {
      const userFound = await this.userRepository.findOneByUsername(username);
      if (userFound !== null && userFound.id?.toString() !== id) {
        throw new AppError('USERNAME_ALREADY_EXISTS');
      }

      user.changeUsername(username);
    }

    if (password) {
      user.changePassword(await this.passwordHasher.generateHashPassword(password));
    }

    if (image) {
      user.changeImage(image);
    }

    return this.userRepository.update(id, user);
  };
}
