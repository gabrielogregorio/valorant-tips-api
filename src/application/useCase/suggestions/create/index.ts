import { SuggestionEntity } from '../../../../domain/suggestion/entity';
import { SuggestionEntityInterface } from '../../../../domain/suggestion/entity/interfaces';
import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';
import {
  CreateSuggestionUseCaseInterface,
  InputCreateSuggestionDto,
  OutputSuggestionDto,
} from '../../../interfaces/createSuggestionUseCase';
import { FindPostByIdOrThrowUseCaseInterface } from '../../../interfaces/IFindPostByIdOrThrowUseCase';

export class CreateSuggestionUseCase implements CreateSuggestionUseCaseInterface {
  constructor(
    private suggestionRepository: SuggestionAggregateRepositoryInterface,
    private findPostByIdOrThrowUseCase: FindPostByIdOrThrowUseCaseInterface,
  ) {}

  execute = async (dto: InputCreateSuggestionDto): Promise<OutputSuggestionDto> => {
    await this.findPostByIdOrThrowUseCase.execute(dto.postId);

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
