import { InputUpdatePostDto, OutputUpdatePostDto } from './update.dto';
import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { PostEntity } from '../../../../domain/post/entity/post';
import { IImagePost } from '../../../../interfaces/post';

export class UpdatePostUseCase {
  constructor(private postRepository: PostAggregateRepositoryInterface) {}

  execute = async (id: string, payload: InputUpdatePostDto): Promise<OutputUpdatePostDto> => {
    const { title, description, tags, imgs, userId } = payload;

    const post = new PostEntity({ userId: String(userId), title: title || '', id });

    if (description) {
      post.changeDescription(description);
    }

    if (tags) {
      post.changeTags(tags);
    }

    const newImgs: IImagePost[] = [];
    imgs?.forEach((img) => {
      newImgs.push({
        description: img.description,
        id: img.id,
        image: img.image,
      });
    });

    if (newImgs.length) {
      post.changeImgs(newImgs);
    }

    const postService = await this.postRepository.update(post);

    return {
      id: postService.id,
      description: postService.description,
      imgs: postService.imgs,
      tags: postService.tags,
      title: postService.title,
      userId: postService.userId,
    };
  };
}
