import { ISuggestion } from '@/interfaces/suggestion';
import { SuggestionRepository } from '../repositories/suggestionRepository';

export class SuggestionService {
  private suggestionRepository: SuggestionRepository;

  constructor(suggestionRepository: SuggestionRepository) {
    this.suggestionRepository = suggestionRepository;
  }

  Create = async ({ post_id, email, description }: ISuggestion): Promise<ISuggestion> =>
    this.suggestionRepository.create({
      post_id,
      email,
      description,
      status: undefined,
    });

  FindAll = async (): Promise<ISuggestion[]> => this.suggestionRepository.findAll();

  UpdateById = async (id: string, status: 'accepted' | 'rejected'): Promise<ISuggestion> =>
    this.suggestionRepository.updateById(id, status);

  DeleteById = async (id: string): Promise<any> => this.suggestionRepository.deleteById(id);
}
