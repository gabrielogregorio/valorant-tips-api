import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { ViewsAggregateRepositoryInterface } from '../../../../domain/views/repository/inteface';
import { InsightsUseCaseInterface, OutputInsightsDto } from './InsightsUseCaseInterface';

export class InsightsUseCase implements InsightsUseCaseInterface {
  constructor(
    private UserRepository: UserRepositoryInterface,
    private postRepository: PostAggregateRepositoryInterface,
    private suggestionRepository: SuggestionAggregateRepositoryInterface,
    private viewsRepository: ViewsAggregateRepositoryInterface,
  ) {}

  execute = async (): Promise<OutputInsightsDto> => {
    const [countAllPosts, countAlMaps, countAlAgents, countAllSuggestions, countAllUsers, count2, count] =
      await Promise.all([
        await this.postRepository.countAll(),
        await this.postRepository.findMaps(),
        await this.postRepository.findAgents(),
        await this.suggestionRepository.count(),
        await this.UserRepository.countDocuments(),
        await this.viewsRepository.findAllDistinctIp(),
        await this.viewsRepository.findAll(),
      ]);

    return {
      countAll: count.length,
      countIps: count2.length,
      countAllPosts,
      countAlMaps: countAlMaps.length,
      countAlAgents: countAlAgents.length,
      countAllSuggestions,
      countAllUsers,
    };
  };
}
