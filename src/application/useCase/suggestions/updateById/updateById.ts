import { statusSuggestionType } from '../../../../domain/suggestion/entity/interfaces';
import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';
import { AppError } from '../../../errors/AppError';
import {
  OutputUpdateByIdSuggestionDto,
  UpdateByIdSuggestionUseCaseInterface,
} from './UpdateByIdSuggestionUseCaseInterface';

export class UpdateSuggestionByIdUseCase implements UpdateByIdSuggestionUseCaseInterface {
  constructor(private suggestionRepository: SuggestionAggregateRepositoryInterface) {}

  execute = async (id: string, status: statusSuggestionType): Promise<OutputUpdateByIdSuggestionDto> => {
    const suggestionUpdated = await this.suggestionRepository.updateById(id, status);
    if (suggestionUpdated === null) {
      throw new AppError('SUGGESTION_NOT_FOUND');
    }

    return suggestionUpdated;
  };
}
