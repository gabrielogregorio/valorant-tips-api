/* eslint-disable max-classes-per-file */
import { UserEntity } from '../../../../domain/user/entity/user';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { FindUserByIdUseCaseInterface, OutputFindUserByIdDto } from './FindUserByIdUseCaseInterface';

class OutputMapper {
  static toOutput(user: UserEntity): OutputFindUserByIdDto {
    return {
      image: user.image,
      username: user.username,
    };
  }
}

export class FindUserByIdUseCase implements FindUserByIdUseCaseInterface {
  constructor(private userRepository: UserRepositoryInterface) {}

  execute = async (id: string): Promise<OutputFindUserByIdDto | null> => {
    const user = await this.userRepository.findById(id);
    if (user === null) {
      return null;
    }

    return OutputMapper.toOutput(user);
  };
}
