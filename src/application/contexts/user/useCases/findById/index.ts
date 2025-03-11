/* eslint-disable max-classes-per-file */
import { UserRepositoryInterface } from '@/domain/contexts/contexts/user/repository';
import { FindUserByIdUseCaseInterface, FindUserByIdOutputDtoInterface } from './FindUserByIdUseCaseInterface';

export class FindUserByIdUseCase implements FindUserByIdUseCaseInterface {
  constructor(private _userRepository: UserRepositoryInterface) {}

  execute = async (id: string): Promise<FindUserByIdOutputDtoInterface | null> => {
    const user = await this._userRepository.findById(id);
    if (user === null) {
      return null;
    }

    return {
      imageUrl: user.imageUrl,
      username: user.username,
    };
  };
}
