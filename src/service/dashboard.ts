import { IPost } from '@/interfaces/post';
import { IView } from '@/interfaces/view';
import { PostRepository } from '@/repositories/postRepository';
import { SuggestionRepository } from '@/repositories/suggestionRepository';
import { UserRepository } from '@/repositories/userRepository';
import { ViewRepository } from '@/repositories/viewRepository';

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

  private viewsRepository: ViewRepository;

  constructor(
    userRepository: UserRepository,
    postRepository: PostRepository,
    suggestionRepository: SuggestionRepository,
    viewsRepository: ViewRepository,
  ) {
    this.userRepository = userRepository;
    this.postRepository = postRepository;
    this.suggestionRepository = suggestionRepository;
    this.viewsRepository = viewsRepository;
  }

  count = async (): Promise<IDashboardServiceType> => {
    const countAllPosts: number = await this.postRepository.countAll();
    const countAlMaps: IPost[] = await this.postRepository.findMaps();
    const countAlAgents: IPost[] = await this.postRepository.findAgents();
    const countAllSuggestions: number = await this.suggestionRepository.count();
    const countAllUsers: number = await this.userRepository.countDocuments();
    const count2: IView[] = await this.viewsRepository.findAllDistinctIp();
    const count: IView[] = await this.viewsRepository.findAll();

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
