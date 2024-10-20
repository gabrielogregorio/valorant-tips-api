import { SuggestionRepositoryInterface } from '@/domain/suggestion/repository';
import { FindAllSuggestionsUseCaseInterface, OutputFindAllSuggestionsDto } from './FindAllSuggestionsUseCaseInterface';

export class FindAllSuggestionsUseCase implements FindAllSuggestionsUseCaseInterface {
  constructor(private suggestionRepository: SuggestionRepositoryInterface) {}

  execute = async (): Promise<OutputFindAllSuggestionsDto[]> => this.suggestionRepository.findAll();
}
