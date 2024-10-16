import { CodeAggregateRepositoryInterface } from '../../../../domain/code/repository/inteface';
import { UserEntity } from '../../../../domain/user/entity/user';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { CreateUserUseCaseInterface, InputCreateUserDto } from '../../../interfaces/CreateUserUseCaseInterface';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private codeRepository: CodeAggregateRepositoryInterface,
  ) {}

  execute = async (code: string, { username, password, image }: InputCreateUserDto): Promise<void> => {
    const codeEntity = await this.codeRepository.findByCode(code);
    if (!codeEntity || !codeEntity?.available) {
      throw new Error('Codigo não existe ou não está disponível');
    }
    codeEntity.useCode();

    this.codeRepository.updateEntity(codeEntity);
    const user = new UserEntity({ password, username });

    if (image) {
      user.changeImage(image);
    }

    await this.userRepository.save(user);
  };
}
