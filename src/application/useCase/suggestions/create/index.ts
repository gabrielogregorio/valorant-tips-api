import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { SuggestionEntity } from '../../../../domain/suggestion/entity';
import { SuggestionEntityInterface } from '../../../../domain/suggestion/entity/interfaces';
import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';
import {
  CreateSuggestionUseCaseInterface,
  InputCreateSuggestionDto,
  OutputSuggestionDto,
} from './createSuggestionUseCase';

export class CreateSuggestionUseCase implements CreateSuggestionUseCaseInterface {
  constructor(
    private suggestionRepository: SuggestionAggregateRepositoryInterface,
    private postRepository: PostAggregateRepositoryInterface,
  ) {}

  execute = async (dto: InputCreateSuggestionDto): Promise<OutputSuggestionDto> => {
    const postFound = await this.postRepository.findById(dto.postId);
    if (!postFound) {
      throw new Error('Post not exists');
    }

    const suggestion = new SuggestionEntity({
      postId: dto.postId,
      description: dto.description,
      email: dto.email,
    });

    const suggestionCreated = await this.suggestionRepository.save(suggestion);

    return this.toOutputDto(suggestionCreated);
  };

  private toOutputDto(suggestion: SuggestionEntityInterface): OutputSuggestionDto {
    return {
      createdAt: suggestion.createdAt,
      description: suggestion.description,
      email: suggestion.email,
      id: suggestion.id,
      postId: suggestion.postId,
      status: suggestion.status,
      updatedAt: suggestion.updatedAt,
    };
  }
}
