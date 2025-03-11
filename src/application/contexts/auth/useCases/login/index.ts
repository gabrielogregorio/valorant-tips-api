import {
  LoginUseCaseInputDtoInterface,
  LoginUseCaseInterface,
  LoginUseCaseOutputDtoInterface,
} from '@/application/contexts/auth/useCases/login/LoginUseCaseInterface';
import { AppError } from '@/application/errors/AppError';
import { UserRepositoryInterface } from '@/domain/contexts/contexts/user/repository';
import { PasswordHasherInterface } from '@/domain/contexts/services/PasswordHasherInterface';
import { JWT_SECRET } from '@/infrastructure/api/config/envs';
import { HandleAuthTokenInterface } from '@/application/services/HandleAuthToken';
import { ONE_HOUR_IN_MINUTES, ONE_MINUTES_IN_SECONDS, ONE_SECOND_IN_MS } from '@/utils/constants';

export class LoginUseCase implements LoginUseCaseInterface {
  constructor(
    private _userRepository: UserRepositoryInterface,
    private _passwordHasher: PasswordHasherInterface,
    private _handleAuthToken: HandleAuthTokenInterface,
  ) {}

  private _geTimeToExpiresToken() {
    const durationHours = 8;

    const expiresAt = new Date(
      Date.now() + durationHours * ONE_HOUR_IN_MINUTES * ONE_MINUTES_IN_SECONDS * ONE_SECOND_IN_MS,
    );
    const expiresAtIso = expiresAt.toISOString();

    return { expiresAtIso, durationHours };
  }

  execute = async ({ username, password }: LoginUseCaseInputDtoInterface): Promise<LoginUseCaseOutputDtoInterface> => {
    const user = await this._userRepository.findOneByUsername(username);
    if (!user) {
      throw new AppError('USER_NOT_FOUND', { username });
    }

    const passwordIsValid = await this._passwordHasher.passwordIsValid(password, user.password);
    if (!passwordIsValid) {
      throw new AppError('INVALID_PASSWORD', { username });
    }

    const { durationHours, expiresAtIso } = this._geTimeToExpiresToken();

    const handleAuthToken = await this._handleAuthToken.generate(
      { username: user.username, name: user.name, userId: user.id.getValue() },
      {
        expiresIn: `${durationHours}h`,
        secret: JWT_SECRET,
      },
    );

    if (handleAuthToken.errors !== null || !handleAuthToken.data) {
      throw new AppError('INTERNAL_ERROR', handleAuthToken);
    }

    return {
      userId: handleAuthToken.data.userId,
      token: handleAuthToken.data.token,
      expiresAtIso,
    };
  };
}
