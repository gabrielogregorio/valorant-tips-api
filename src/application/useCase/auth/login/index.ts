import { AppError } from '@/application/errors/AppError';
import { PasswordHasherInterface } from '@/domain/services/PasswordHasherInterface';
import { UserRepositoryInterface } from '@/domain/user/repository/userRepository.interface';
import { JWT_SECRET } from '@/infrastructure/api/config/envs';
import {
  InputLoginUseCaseDto,
  LoginUseCaseInterface,
  OutputLoginUseCaseDto,
} from '@/useCase/auth/login/LoginUseCaseInterface';
import jwt from 'jsonwebtoken';

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private passwordHasher: PasswordHasherInterface,
  ) {}

  execute = async ({ username, password }: InputLoginUseCaseDto): Promise<OutputLoginUseCaseDto> => {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user) {
      throw new AppError('USER_NOT_FOUND');
    }

    const passwordIsValid = await this.passwordHasher.passwordIsValid(password, user.password);
    if (!passwordIsValid) {
      throw new AppError('INVALID_PASSWORD');
    }

    return new Promise<{ token: string; id: string }>((resolve, reject) => {
      // desacoplar isso
      jwt.sign({ username, name: user.username, id: user.id }, JWT_SECRET, { expiresIn: '128h' }, (error, token) => {
        if (error || token === undefined) {
          reject(new AppError('INTERNAL_ERROR'));
          return;
        }

        resolve({ token, id: user.id?.toString() as string });
      });
    });
  };
}
