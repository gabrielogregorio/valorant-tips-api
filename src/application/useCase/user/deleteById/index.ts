import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { DeleteUserByIdUseCaseInterface } from './DeleteUserByIdUseCaseInterface';

export class DeleteUserByIdUseCase implements DeleteUserByIdUseCaseInterface {
  constructor(private userRepository: UserRepositoryInterface) {}

  execute = async (id: string) => {
    await this.userRepository.findOneAndDelete(id);
  };
}
