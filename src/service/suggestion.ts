import { ISuggestionMongo } from '@/interfaces/suggestion';
import { PostService } from '@/service/post';
import { SuggestionRepository } from '../repositories/suggestionRepository';

export class SuggestionService {
  private suggestionRepository: SuggestionRepository;

  private postService: PostService;

  constructor(suggestionRepository: SuggestionRepository, postService: PostService) {
    this.suggestionRepository = suggestionRepository;
    this.postService = postService;
  }

  create = async (suggestion: Omit<ISuggestionMongo, '_id'>): Promise<ISuggestionMongo> => {
    await this.postService.findByIdOrThrow(suggestion.post_id as unknown as string);

    return this.suggestionRepository.create(suggestion);
  };

  FindAll = async (): Promise<ISuggestionMongo[]> => this.suggestionRepository.findAll();

  UpdateById = async (id: string, status: ISuggestionMongo['status']) =>
    this.suggestionRepository.updateById(id, status);

  deleteById = async (id: string) => this.suggestionRepository.deleteById(id);
}
