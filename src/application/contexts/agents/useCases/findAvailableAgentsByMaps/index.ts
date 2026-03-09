import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import { AgentsRepositoryInterface } from '@/domain/contexts/contexts/agents/repository';
import {
  FindAvailableAgentsByMapsUseCaseInterface,
  FindAvailableAgentsByMapsUseCaseOutputDtoInterface,
} from './findAvailableAgentsByMapsUseCase';

export class FindAvailableAgentsByMapsUseCase implements FindAvailableAgentsByMapsUseCaseInterface {
  constructor(
    private _postRepository: PostRepositoryInterface,
    private _agentsRepository: AgentsRepositoryInterface,
  ) {}

  execute = async (mapId: string): Promise<FindAvailableAgentsByMapsUseCaseOutputDtoInterface[]> => {
    const agentsIds = await this._postRepository.findAgentsByMapInPosts(mapId);
    const agents = await this._agentsRepository.findByIds(agentsIds);

    return agents.map((map) => ({
      id: map.id.getValue(),
      imageUrl: map.imageUrl,
      name: map.name,
    }));
  };
}
