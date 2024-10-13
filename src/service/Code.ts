import { v4 as uuidV4 } from 'uuid';
import { ICode } from '@/interfaces/code';
import { CodeRepository } from '@/repositories/codeRepository';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';

export class CodeService {
  private codeRepository: CodeRepository;

  constructor(codeRepository: CodeRepository) {
    this.codeRepository = codeRepository;
  }

  create = async (): Promise<ICode> =>
    this.codeRepository.create({
      code: uuidV4(),
      available: true,
    });

  findCodeAndThrown = async (code: string): Promise<ICode> => {
    const codeResult = await this.findCode(code);

    if (codeResult === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return codeResult;
  };

  findCode = async (code: string): Promise<ICode | null> => this.codeRepository.findByCode(code);

  useCode = async (code: string): Promise<ICode | null> => this.codeRepository.updateToAvailable(code);
}
