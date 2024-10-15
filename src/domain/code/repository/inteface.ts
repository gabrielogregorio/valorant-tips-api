import { RepositoryInterface } from 'src/domain/@shared/repository/customRepository.interface';
import { CodeEntity } from '../enttity';

export interface CodeAggregateRepositoryInterface extends RepositoryInterface<CodeEntity> {
  save: (code: CodeEntity) => Promise<CodeEntity>;
  findByCode: (code: string) => Promise<CodeEntity | null>;
  updateToAvailable: (code: string) => Promise<CodeEntity | null>;
}
