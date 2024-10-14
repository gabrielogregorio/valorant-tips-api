import { JWT_SECRET } from '@/config/envs';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { PasswordHasher } from '@/service/passwordHasher';
import { UserService } from '@/service/user';
import jwt from 'jsonwebtoken';

export class AuthService {
  constructor(
    private userService: UserService,
    private passwordHasher: PasswordHasher,
  ) {}

  auth = async ({ username, password }: { username: string; password: string }) => {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    if (!this.passwordHasher.validatePassword(password, user.password)) {
      throw new AppError(errorStates.PASSWORD_IS_INVALID, 'encrypt is invalid');
    }

    return new Promise<{ token: string; id: string }>((resolve, reject) => {
      jwt.sign({ username, name: user.username, id: user._id }, JWT_SECRET, { expiresIn: '128h' }, (error, token) => {
        if (error || token === undefined) {
          reject(new AppError(errorStates.INTERNAL_ERROR, JSON.stringify(error)));
          return;
        }

        resolve({ token, id: user._id?.toString() as string });
      });
    });
  };
}
