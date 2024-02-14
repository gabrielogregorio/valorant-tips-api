import { PostRepository } from '@/repositories/postRepository';
import { SuggestionRepository } from '@/repositories/suggestionRepository';
import { UserRepository } from '@/repositories/userRepository';
import { ViewsRepository } from '@/repositories/viewsRepository';

export type IDashboardServiceType = {
  countAll: number;
  countIps: number;
  countAllPosts: number;
  countAlMaps: number;
  countAlAgents: number;
  countAllSuggestions: number;
  countAllUsers: number;
};

export class DashboardService {
  private userRepository: UserRepository;

  private postRepository: PostRepository;

  private suggestionRepository: SuggestionRepository;

  private viewsRepository: ViewsRepository;

  constructor(
    userRepository: UserRepository,
    postRepository: PostRepository,
    suggestionRepository: SuggestionRepository,
    viewsRepository: ViewsRepository,
  ) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.suggestionRepository = suggestionRepository;
    this.viewsRepository = viewsRepository;
  }

  count = async (): Promise<IDashboardServiceType> => {
    const [countAllPosts, countAlMaps, countAlAgents, countAllSuggestions, countAllUsers, count2, count] =
      await Promise.all([
        await this.postRepository.countAll(),
        await this.postRepository.findMaps(),
        await this.postRepository.findAgents(),
        await this.suggestionRepository.count(),
        await this.userRepository.countDocuments(),
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
