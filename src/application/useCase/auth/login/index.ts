import jwt from 'jsonwebtoken';
import {
  InputLoginUseCaseDto,
  LoginUseCaseInterface,
  OutputLoginUseCaseDto,
} from '../../../interfaces/LoginUseCaseInterface';
import { PasswordHasherInterface } from '../../../../domain/services/PasswordHasherInterface';
import { AppError } from '../../../../infrastructure/api/errors';
import { errorStates } from '../../../../infrastructure/api/errors/types';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { JWT_SECRET } from '../../../../infrastructure/api/config/envs';

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private passwordHasher: PasswordHasherInterface,
  ) {}

  execute = async ({ username, password }: InputLoginUseCaseDto): Promise<OutputLoginUseCaseDto> => {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    if (!this.passwordHasher.validatePassword(password, user.password)) {
      throw new AppError(errorStates.PASSWORD_IS_INVALID, 'encrypt is invalid');
    }

    return new Promise<{ token: string; id: string }>((resolve, reject) => {
      jwt.sign({ username, name: user.username, id: user.id }, JWT_SECRET, { expiresIn: '128h' }, (error, token) => {
        if (error || token === undefined) {
          reject(new AppError(errorStates.INTERNAL_ERROR, JSON.stringify(error)));
          return;
        }

        resolve({ token, id: user.id?.toString() as string });
      });
    });
  };
}
