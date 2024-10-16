import { CodeAggregateRepositoryInterface } from '../../../../domain/code/repository/inteface';
import { CodeEntity } from '../../../../domain/code/enttity';
import { CreateCodeUseCaseInterface, OutputCreateCodeDto } from './CreateCodeUseCaseInterface';

export class CreateCodeUseCase implements CreateCodeUseCaseInterface {
  constructor(private codeRepository: CodeAggregateRepositoryInterface) {}

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
