import { v4 as uuidV4 } from 'uuid';
import { ICode } from '@/interfaces/code';
import { CodeRepository } from '@/repositories/codeRepository';

export class CodeService {
  private codeRepository: CodeRepository;

  constructor(codeRepository: CodeRepository) {
    this.codeRepository = codeRepository;
  }

  create = async (): Promise<ICode> =>
    this.codeRepository.create({
      code: `${uuidV4()}${Math.random()}${uuidV4()}${Math.random()}`,
      available: true,
    });

  findCode = async (code: string): Promise<ICode | null> => this.codeRepository.findByCode(code);

  useCode = async (code: string): Promise<ICode | null> => this.codeRepository.updateToAvailable(code);
}
