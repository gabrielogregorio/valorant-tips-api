import { PostRepositoryInterface } from '@/domain/post/repository/postRepository.interface';
import { FindAvailableAgentsUseCaseInterface } from './FindAvailableAgentsUseCaseInterface';

export class FindAvailableAgentsUseCase implements FindAvailableAgentsUseCaseInterface {
  constructor(private postRepository: PostRepositoryInterface) {}

  execute = async (map: string): Promise<string[]> => this.postRepository.findAvailableAgents(map);
}
