import { PostRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import {
  FindPostByIdOrThrowUseCaseInterface,
  OutputFindPostByIdOrThrowUseCaseDto,
} from './IFindPostByIdOrThrowUseCase';

export class FindPostByIdOrThrowUseCase implements FindPostByIdOrThrowUseCaseInterface {
  constructor(
    private postRepository: PostRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  execute = async (postId: string): Promise<OutputFindPostByIdOrThrowUseCaseDto> => {
    const post = await this.postRepository.findById(postId);

    if (post === null) {
      throw new Error('');
    }

    const userData = await this.userRepository.findById(post.userId);

    return {
      id: post.id,
      description: post.description,
      imgs: post.imgs,
      tags: post.tags,
      title: post.title,
      user: {
        username: userData?.username || '',
        image: userData?.image || '',
      },
    };
  };
}
