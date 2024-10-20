import { CodeRepositoryInterface } from '@/domain/code/repository/interface';
import { UserEntity } from '@/domain/user/entity/user';
import { UserRepositoryInterface } from '@/domain/user/repository/userRepository.interface';
import { AppError } from '@/application/errors/AppError';
import { PasswordHasherInterface } from '@/domain/services/PasswordHasherInterface';
import { CreateUserUseCaseInterface, CreateUserInputDto } from './CreateUserUseCaseInterface';

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  constructor(
    private userRepository: UserRepositoryInterface,
    private codeRepository: CodeRepositoryInterface,
    private passwordHasher: PasswordHasherInterface,
  ) {}

  execute = async (code: string, { username, password, image }: CreateUserInputDto): Promise<void> => {
    const codeEntity = await this.codeRepository.findByCode(code);
    if (!codeEntity || !codeEntity?.available) {
      throw new AppError('CODE_IS_NOT_AVAILABLE');
    }

    const userFound = await this.userRepository.findOneByUsername(username);
    if (userFound) {
      throw new AppError('USERNAME_ALREADY_EXISTS');
    }

    codeEntity.useCode();

    this.codeRepository.updateEntity(codeEntity);
    const user = new UserEntity({ username });

    user.changePassword(await this.passwordHasher.generateHashPassword(password));

    if (image) {
      user.changeImage(image);
    }

    await this.userRepository.save(user);
  };
}
