/* eslint-disable @typescript-eslint/no-explicit-any */
import { SuggestionRepositoryInterface } from '@/domain/contexts/contexts/suggestion/repository';
import { AppError } from '@/application/errors/AppError';
import {
  UpdateByIdSuggestionOutputDtoInterface,
  UpdateSuggestionByIdUseCaseInterface,
} from './UpdateSuggestionByIdUseCaseInterface';

export class UpdateSuggestionByIdUseCase implements UpdateSuggestionByIdUseCaseInterface {
  constructor(private _suggestionRepository: SuggestionRepositoryInterface) {}

  execute = async (id: string, status: any): Promise<UpdateByIdSuggestionOutputDtoInterface> => {
    const suggestion = await this._suggestionRepository.findById(id);
    if (!suggestion) {
      throw new AppError('SUGGESTION_NOT_FOUND', { id, status });
    }

    suggestion.updateStatus(status);

    const suggestionUpdated = await this._suggestionRepository.update(suggestion);

    // resolve prolem suggestion tipdated
    return {
      createdAt: suggestionUpdated!.createdAt,
      description: suggestionUpdated!.description,
      updatedAt: suggestionUpdated!.updatedAt,
      email: suggestionUpdated!.email,
      id: suggestionUpdated!.id.getValue(),
      postId: suggestionUpdated!.postId.getValue(),
      status: suggestionUpdated!.status,
    };
  };
}
