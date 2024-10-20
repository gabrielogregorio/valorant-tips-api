import { SuggestionRepositoryInterface } from '@/domain/suggestion/repository';
import { FindAllSuggestionsUseCaseInterface, FindAllSuggestionsOutputDto } from './FindAllSuggestionsUseCaseInterface';

export class FindAllSuggestionsUseCase implements FindAllSuggestionsUseCaseInterface {
  constructor(private suggestionRepository: SuggestionRepositoryInterface) {}

  execute = async (): Promise<FindAllSuggestionsOutputDto[]> => this.suggestionRepository.findAll();
}
