import { UserEntity } from '../../../../domain/user/entity/user';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { CreateUserUseCaseInterface, InputCreateUserDto } from '../../../interfaces/CreateUserUseCaseInterface';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(private UserRepository: UserRepositoryInterface) {}

  execute = async ({ username, password, image }: InputCreateUserDto): Promise<void> => {
    const user = new UserEntity({ password, username });

    user.changeImage(image);

    await this.UserRepository.save(user);
  };
}
