import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';
import {
  FindAllSuggestionsUseCaseInterface,
  OutputFindAllSuggestionsDto,
} from '../../../interfaces/FindAllSuggestionsUseCaseInterface';

export class FindAllSuggestionsUseCase implements FindAllSuggestionsUseCaseInterface {
  constructor(private suggestionRepository: SuggestionAggregateRepositoryInterface) {}

  execute = async (): Promise<OutputFindAllSuggestionsDto[]> => this.suggestionRepository.findAll();
}
