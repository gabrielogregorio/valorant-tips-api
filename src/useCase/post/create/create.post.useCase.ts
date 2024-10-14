import { PostInfraRepository } from 'src/infrastructure/post/repository/mongo/postRepository';
import { PostEntity } from '../../../domain/post/entity/post';
import { InputCreatePostDto, OutputCreatePostDto } from './create.post.dto';

export class CreatePostUseCase {
  constructor(private postRepository: PostInfraRepository) {}

  create = async ({ title, description, userId, tags, imgs }: InputCreatePostDto): Promise<OutputCreatePostDto> => {
    const post = new PostEntity({ userId, title });

    post.changeDescription(description)
    post.changeTags(tags)
    post.changeImgs(imgs)

    this.postRepository.create(post);
  };
}
