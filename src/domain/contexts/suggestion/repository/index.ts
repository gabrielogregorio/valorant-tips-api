import { RepositoryInterface } from '@/domain/contexts/common/repository/customRepository.interface';
import { SuggestionEntityInterface } from '@/domain/contexts/contexts/suggestion/entity/interfaces';

export interface SuggestionRepositoryInterface extends RepositoryInterface<SuggestionEntityInterface> {
  save: (suggestion: SuggestionEntityInterface) => Promise<SuggestionEntityInterface>;
  findAll: () => Promise<SuggestionEntityInterface[]>;
  update: (suggestion: SuggestionEntityInterface) => Promise<SuggestionEntityInterface | null>;
  findById: (id: string) => Promise<SuggestionEntityInterface>;
  count: () => Promise<number>;
}
