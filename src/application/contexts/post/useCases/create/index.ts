/* eslint-disable max-params */
import { UserRepositoryInterface } from '@/domain/contexts/contexts/user/repository';
import { PostEntity } from '@/domain/contexts/contexts/post/entity/post';
import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import { DomainError } from '@/domain/contexts/errors';
import { AgentsRepositoryInterface } from '@/domain/contexts/contexts/agents/repository';
import { MapsRepositoryInterface } from '@/domain/contexts/contexts/maps/repository';
import { PostTagsRepositoryInterface } from '@/domain/contexts/contexts/postTags/repository';
import {
  CreatePostUseCaseInterface,
  CreatePostInputDtoInterface,
  CreatePostOutputDtoInterface,
} from './CreatePostUseCaseInterface';

export class CreatePostUseCase implements CreatePostUseCaseInterface {
  constructor(
    private _postRepository: PostRepositoryInterface,
    private _userRepository: UserRepositoryInterface,
    private _agentsRepository: AgentsRepositoryInterface,
    private _mapsRepository: MapsRepositoryInterface,
    private _postTagsRepository: PostTagsRepositoryInterface,
  ) {}

  execute = async ({
    title,
    description,
    authorIds,
    tagIds,
    steps,
    agentIds,
    mapIds,
  }: CreatePostInputDtoInterface): Promise<CreatePostOutputDtoInterface> => {
    const authors = await this._userRepository.findByIds(authorIds);
    if (!authors) {
      throw new DomainError('NotFound', `user id '${authorIds}' not found to create post`, { authorIds });
    }

    const agents = await this._agentsRepository.findByIds(agentIds);
    if (!agents) {
      throw new DomainError('NotFound', `agents id '${agentIds}' not found to create post`, { agentIds });
    }

    const maps = await this._mapsRepository.findByIds(mapIds);
    if (!maps) {
      throw new DomainError('NotFound', `maps id '${agentIds}' not found to create post`, { agentIds });
    }

    const tags = await this._postTagsRepository.findByIds(tagIds);
    if (!tags) {
      throw new DomainError('NotFound', `tagIds id '${tagIds}' not found to create post`, { tagIds });
    }

    const post = PostEntity.create({ authors, description, title });
    post.changeAgents(agents);
    post.changeMap(maps);
    post.changeTags(tags);
    post.changeSteps(steps);

    const postSave = await this._postRepository.save(post);

    return {
      id: postSave.id.getValue(),
      title: postSave.title,
      description: postSave.description,
      agents: postSave.agents.map((agent) => ({
        id: agent.id.getValue(),
        imageUrl: agent.imageUrl,
        name: agent.name,
      })),

      maps: postSave.maps.map((map) => ({
        id: map.id.getValue(),
        imageUrl: map.imageUrl,
        name: map.name,
      })),

      tags: postSave.tags.map((tag) => ({
        id: tag.id.getValue(),
        name: tag.name,
      })),

      steps: postSave.steps.map((step) => ({
        id: step.id.getValue(),
        description: step.description,
        imageUrl: step.imageUrl,
      })),

      authors: postSave.authors.map((author) => ({
        id: author.id.getValue(),
        username: author.username,
        imageUrl: author.imageUrl,
      })),
    };
  };
}
