import { UserEntity } from '../../../../domain/user/entity/user';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { FindUserByIdUseCaseInterface, OutputFindUserByIdDto } from '../../../interfaces/FindUserByIdUseCaseInterface';

export class FindUserByIdUseCase implements FindUserByIdUseCaseInterface {
  constructor(private userRepository: UserRepositoryInterface) {}

  execute = async (id: string): Promise<OutputFindUserByIdDto | null> => {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      return null;
    }

    return new UserEntity({
      id: user.id.toString(),
      username: user.username,
    });
  };
}
