import { CodeRepositoryInterface } from '@/domain/code/repository/interface';
import { CreateCodeUseCaseInterface, OutputCreateCodeDto } from '@/useCase/code/create/CreateCodeUseCaseInterface';
import { CodeEntity } from '@/domain/code/entity';

export class CreateCodeUseCase implements CreateCodeUseCaseInterface {
  constructor(private codeRepository: CodeRepositoryInterface) {}

  execute = async (): Promise<OutputCreateCodeDto> => {
    const code = new CodeEntity();

    const codeCreated = await this.codeRepository.save(code);

    return {
      available: codeCreated.available,
      code: codeCreated.code,
      id: codeCreated.id,
    };
  };
}
