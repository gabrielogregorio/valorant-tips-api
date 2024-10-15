import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { DeleteUserByIdUseCaseInterface } from '../../../interfaces/DeleteUserByIdUseCaseInterface';

export class DeleteUserByIdUseCase implements DeleteUserByIdUseCaseInterface {
  constructor(private UserRepository: UserRepositoryInterface) {}

  execute = async (id: string) => {
    await this.UserRepository.findOneAndDelete(id);
  };
}
