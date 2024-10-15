import { PostRepository } from '../../../../infrastructure/post/repository/mongo/postRepository';
import {
  FindPostByIdOrThrowUseCaseInterface,
  OutputFindPostByIdOrThrowUseCaseDto,
} from '../../../interfaces/IFindPostByIdOrThrowUseCase';

export class FindPostByIdOrThrowUseCase implements FindPostByIdOrThrowUseCaseInterface {
  constructor(private postRepository: PostRepository) {}

  execute = async (postId: string): Promise<OutputFindPostByIdOrThrowUseCaseDto> => {
    const post = await this.postRepository.findById(postId);

    if (post === null) {
      throw new Error('');
    }

    return {
      description: post.description,
      imgs: post.imgs,
      tags: post.tags,
      title: post.title,
      userId: post.userId,
    };
  };
}
