import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import {
  FindAllByMapAndAgentUseCaseInterface,
  FindByMapAndAgentInputDtoInterface,
  FindByMapAndAgentOutputDtoInterface,
} from './FindAllByMapAndAgentUseCaseInterface';

export class FindAllByMapAndAgentUseCase implements FindAllByMapAndAgentUseCaseInterface {
  constructor(private _postRepository: PostRepositoryInterface) {}

  execute = async (payload: FindByMapAndAgentInputDtoInterface): Promise<FindByMapAndAgentOutputDtoInterface[]> => {
    const postsItems = await this._postRepository.findAllByMapAndAgent(payload.agent, payload.map);

    return postsItems.map((post) => ({
      id: post.id.getValue(),
      title: post.title,
      description: post.description,
      agents: post.agents.map((agent) => ({
        id: agent.id.getValue(),
        imageUrl: agent.imageUrl,
        name: agent.name,
      })),

      maps: post.maps.map((map) => ({
        id: map.id.getValue(),
        imageUrl: map.imageUrl,
        name: map.name,
      })),

      tags: post.tags.map((tag) => ({
        id: tag.id.getValue(),
        name: tag.name,
      })),

      steps: post.steps.map((step) => ({
        id: step.id.getValue(),
        description: step.description,
        imageUrl: step.imageUrl,
      })),

      authors: post.authors.map((author) => ({
        id: author.id.getValue(),
        username: author.username,
        imageUrl: author.imageUrl,
      })),
    }));
  };
}
