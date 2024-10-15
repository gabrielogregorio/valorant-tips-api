import { CodeAggregateRepositoryInterface } from '../../../../domain/code/repository/inteface';
import { OutputUseCodeDto, UseCodeUseCaseInterface } from '../../../interfaces/UseCodeUseCaseInterface';

export class UseCodeUseCase implements UseCodeUseCaseInterface {
  constructor(private codeRepository: CodeAggregateRepositoryInterface) {}

  execute = async (code: string): Promise<OutputUseCodeDto> => {
    const codeFound = await this.codeRepository.updateToAvailable(code);
    if (codeFound === null) {
      throw new Error('Not found');
    }

    return {
      available: codeFound.available,
      code: codeFound.code,
    };
  };
}
