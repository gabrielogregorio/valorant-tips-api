import { statusSuggestionType } from '../../../../domain/suggestion/entity/interfaces';
import { SuggestionRepositoryInterface } from '../../../../domain/suggestion/repository';
import { AppError } from '../../../errors/AppError';
import {
  OutputUpdateByIdSuggestionDto,
  UpdateSuggestionByIdUseCaseInterface,
} from './UpdateSuggestionByIdUseCaseInterface';

export class UpdateSuggestionByIdUseCase implements UpdateSuggestionByIdUseCaseInterface {
  constructor(private suggestionRepository: SuggestionRepositoryInterface) {}

  execute = async (id: string, status: statusSuggestionType): Promise<OutputUpdateByIdSuggestionDto> => {
    const suggestionUpdated = await this.suggestionRepository.updateById(id, status);
    if (suggestionUpdated === null) {
      throw new AppError('SUGGESTION_NOT_FOUND');
    }

    return suggestionUpdated;
  };
}
