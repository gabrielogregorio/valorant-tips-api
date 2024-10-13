import { ICreateSuggestion, IDatabaseSuggestion } from '@/interfaces/suggestion';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { PostService } from '@/service/post';
import { SuggestionRepository } from '../repositories/suggestionRepository';

export class SuggestionService {
  private suggestionRepository: SuggestionRepository;

  private postService: PostService;

  constructor(suggestionRepository: SuggestionRepository, postService: PostService) {
    this.suggestionRepository = suggestionRepository;
    this.postService = postService;
  }

  create = async (suggestion: ICreateSuggestion): Promise<IDatabaseSuggestion> => {
    await this.postService.findByIdOrThrow(suggestion.postId as unknown as string);

    return this.suggestionRepository.create(suggestion);
  };

  FindAll = async (): Promise<IDatabaseSuggestion[]> => this.suggestionRepository.findAll();

  UpdateById = async (id: string, status: IDatabaseSuggestion['status']): Promise<IDatabaseSuggestion> => {
    const suggestionUpdated = await this.suggestionRepository.updateById(id, status);
    if (suggestionUpdated === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return suggestionUpdated;
  };

  deleteById = async (id: string) => this.suggestionRepository.deleteById(id);
}
