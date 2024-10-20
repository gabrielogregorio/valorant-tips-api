import { PostRepositoryInterface } from '@/domain/post/repository/postRepository.interface';
import { SuggestionRepositoryInterface } from '@/domain/suggestion/repository';
import { UserRepositoryInterface } from '@/domain/user/repository/userRepository.interface';
import { ViewsRepositoryInterface } from '@/domain/views/repository/interface';
import { DashboardUseCaseInterface, DashboardOutputDto } from './DashboardUseCaseInterface';

export class DashboardUseCase implements DashboardUseCaseInterface {
  constructor(
    private UserRepository: UserRepositoryInterface,
    private postRepository: PostRepositoryInterface,
    private suggestionRepository: SuggestionRepositoryInterface,
    private viewsRepository: ViewsRepositoryInterface,
  ) {}

  execute = async (): Promise<DashboardOutputDto> => {
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
