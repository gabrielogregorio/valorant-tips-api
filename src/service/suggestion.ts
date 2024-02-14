import { ISuggestion } from '@/interfaces/suggestion';
import { PostService } from '@/service/post';
import { SuggestionRepository } from '../repositories/suggestionRepository';

export class SuggestionService {
  private suggestionRepository: SuggestionRepository;

  private postService: PostService;

  constructor(suggestionRepository: SuggestionRepository, postService: PostService) {
    this.suggestionRepository = suggestionRepository;
    this.postService = postService;
  }

  create = async (suggestion: ISuggestion): Promise<ISuggestion> => {
    await this.postService.findByIdOrThrow(suggestion.post_id as unknown as string);

    return this.suggestionRepository.create(suggestion);
  };

  FindAll = async (): Promise<ISuggestion[]> => this.suggestionRepository.findAll();

  UpdateById = async (id: string, status: ISuggestion['status']) => this.suggestionRepository.updateById(id, status);

  deleteById = async (id: string) => this.suggestionRepository.deleteById(id);
}
