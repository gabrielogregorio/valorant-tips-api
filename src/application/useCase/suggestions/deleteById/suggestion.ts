import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';
import { DeleteSuggestionByIdUseCaseInterface } from './DeleteSuggestionByIdUseCaseInterface';

export class DeleteSuggestionByIdUseCase implements DeleteSuggestionByIdUseCaseInterface {
  constructor(private suggestionRepository: SuggestionAggregateRepositoryInterface) {}

  execute = async (id: string): Promise<void> => {
    const suggestion = await this.suggestionRepository.findById(id);

    suggestion.delete();

    await this.suggestionRepository.deleteById(id);
  };
}
