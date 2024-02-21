import { JWT_SECRET } from '@/config/envs';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { UserService } from '@/service/user';
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  auth = async ({ username, password }: { username: string; password: string }) => {
    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
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
