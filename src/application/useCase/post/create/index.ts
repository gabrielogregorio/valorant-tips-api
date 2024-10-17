import { PostEntity } from '../../../../domain/post/entity/post';
import { CreatePostUseCaseInterface, InputCreatePostDto, OutputCreatePostDto } from './CreatePostUseCaseInterface';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { PostRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';

export class CreatePostUseCase implements CreatePostUseCaseInterface {
  constructor(
    private postRepository: PostRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  execute = async ({ title, description, userId, tags, imgs }: InputCreatePostDto): Promise<OutputCreatePostDto> => {
    const post = new PostEntity({ userId, title });

    post.changeDescription(description);
    post.changeTags(tags);
    post.changeImgs(imgs);

    this.postRepository.save(post);

    const user = await this.userRepository.findById(post.userId);

    return {
      id: post.id,
      description: post.description,
      imgs: post.imgs.map((img) => ({
        description: img.description,
        id: img.id,
        image: img.image,
      })),
      tags: post.tags,
      title: post.title,
      user: {
        username: user?.username || '',
        image: user?.image || '',
      },
    };
  };
}
