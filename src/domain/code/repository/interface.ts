import { CodeEntity } from '@/domain/code/entity';
import { RepositoryInterface } from '@/domain/common/repository/customRepository.interface';

export interface CodeRepositoryInterface extends RepositoryInterface<CodeEntity> {
  save: (code: CodeEntity) => Promise<CodeEntity>;
  findByCode: (code: string) => Promise<CodeEntity | null>;
  updateEntity: (code: CodeEntity) => Promise<CodeEntity | null>; // trocar para save, para ser agnostico
}
