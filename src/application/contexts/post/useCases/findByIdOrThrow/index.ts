import { AppError } from '@/application/errors/AppError';
import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import {
  FindPostByIdOrThrowUseCaseInterface,
  FindPostByIdOrThrowUseCaseOutputDtoInterface,
} from './IFindPostByIdOrThrowUseCase';

export class FindPostByIdOrThrowUseCase implements FindPostByIdOrThrowUseCaseInterface {
  constructor(private _postRepository: PostRepositoryInterface) {}

  execute = async (postId: string): Promise<FindPostByIdOrThrowUseCaseOutputDtoInterface> => {
    const post = await this._postRepository.findById(postId);

    if (!post) {
      throw new AppError('POST_NOT_EXISTS', { postId });
    }

    return {
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
    };
  };
}
