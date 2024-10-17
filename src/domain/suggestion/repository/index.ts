import { RepositoryInterface } from 'src/domain/common/repository/customRepository.interface';
import { SuggestionEntityInterface } from '../entity/interfaces';

export interface SuggestionRepositoryInterface extends RepositoryInterface<SuggestionEntityInterface> {
  save: (suggestion: SuggestionEntityInterface) => Promise<SuggestionEntityInterface>;
  findAll: () => Promise<SuggestionEntityInterface[]>;
  updateById: (id: string, status: SuggestionEntityInterface['status']) => Promise<SuggestionEntityInterface | null>;
  deleteById: (id: string) => Promise<void | null>;
  findById: (id: string) => Promise<SuggestionEntityInterface>;
  count: () => Promise<number>;
}
