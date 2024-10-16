import { PostRepository } from 'src/infrastructure/post/repository/mongo/postRepository';
import { PostEntity } from '../../../../domain/post/entity/post';
import { CreatePostUseCaseInterface, InputCreatePostDto, OutputCreatePostDto } from './CreatePostUseCaseInterface';

export class CreatePostUseCase implements CreatePostUseCaseInterface {
  constructor(private postRepository: PostRepository) {}

  execute = async ({ title, description, userId, tags, imgs }: InputCreatePostDto): Promise<OutputCreatePostDto> => {
    const post = new PostEntity({ userId, title });

    post.changeDescription(description);
    post.changeTags(tags);
    post.changeImgs(imgs);

    this.postRepository.save(post);

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
      userId: post.userId,
    };
  };
}
