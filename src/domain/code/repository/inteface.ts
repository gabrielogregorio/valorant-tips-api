import { RepositoryInterface } from 'src/domain/common/repository/customRepository.interface';
import { CodeEntity } from '../enttity';

export interface CodeRepositoryInterface extends RepositoryInterface<CodeEntity> {
  save: (code: CodeEntity) => Promise<CodeEntity>;
  findByCode: (code: string) => Promise<CodeEntity | null>;
  updateEntity: (code: CodeEntity) => Promise<CodeEntity | null>; // trocar para save, para ser agnostico
}
