import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';
import { AppError } from '../../../../infrastructure/api/errors';
import { errorStates } from '../../../../infrastructure/api/errors/types';
import { statusSuggestionType } from '../../../../interfaces/suggestion';
import {
  OutputUpdateByIdSuggestionDto,
  UpdateByIdSuggestionUseCaseInterface,
} from '../../../interfaces/UpdateByIdSuggestionUseCaseInterface';

export class UpdateSuggestionByIdUseCase implements UpdateByIdSuggestionUseCaseInterface {
  constructor(private suggestionRepository: SuggestionAggregateRepositoryInterface) {}

  execute = async (id: string, status: statusSuggestionType): Promise<OutputUpdateByIdSuggestionDto> => {
    const suggestionUpdated = await this.suggestionRepository.updateById(id, status);
    if (suggestionUpdated === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return suggestionUpdated;
  };
}
