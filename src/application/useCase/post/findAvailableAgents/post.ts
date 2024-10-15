import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';

export class FindAvailableAgentsUseCase {
  constructor(private postRepository: PostAggregateRepositoryInterface) {}

  execute = async (map: string): Promise<string[]> => this.postRepository.findAvailableAgents(map);
}
