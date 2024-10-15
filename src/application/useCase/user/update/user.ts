import { PasswordHasherInterface } from '../../../../domain/services/PasswordHasherInterface';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { AppError } from '../../../../infrastructure/api/errors';
import { errorStates } from '../../../../infrastructure/api/errors/types';
import { UpdateUserUseCaseDto, UpdateUserUseCaseInterface } from '../../../interfaces/UpdateUserUseCaseInterface';

export class UpdateUserUseCase implements UpdateUserUseCaseInterface {
  constructor(
    private UserRepository: UserRepositoryInterface,
    private passwordHasher: PasswordHasherInterface,
  ) {}

  execute = async (id: string, { username, password, image }: UpdateUserUseCaseDto): Promise<void> => {
    const user = await this.UserRepository.findById(id);
    if (user === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    if (username) {
      const userFound = await this.UserRepository.findOneByUsername(username);
      if (userFound !== null && userFound.id?.toString() !== id) {
        throw new AppError(errorStates.CONFLICT_ALREADY_EXISTS);
      }

      user.changeUsername(username);
    }

    if (password) {
      user.changePassword(await this.passwordHasher.generateHashPassword(password));
    }

    if (image) {
      user.changeImage(image);
    }

    return this.UserRepository.update(id, user);
  };
}
