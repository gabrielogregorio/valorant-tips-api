import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { FindUserByUsernameUseCaseInterface, OutputFindUserByUsernameDto } from './FindUserByUsernameUseCaseInterface';

export class FindUserByUsernameUseCase implements FindUserByUsernameUseCaseInterface {
  constructor(private UserRepository: UserRepositoryInterface) {}

  execute = async (username: string): Promise<OutputFindUserByUsernameDto | null> => {
    const user = await this.UserRepository.findOneByUsername(username);
    if (user === null) {
      return null;
    }

    return {
      image: user.image,
      username: user.username,
    };
  };
}
