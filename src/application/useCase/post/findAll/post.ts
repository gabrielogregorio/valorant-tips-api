import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { OutputFindAllPostDto } from './findAll.dto';

export class FindAllPostUseCase {
  constructor(private postRepository: PostAggregateRepositoryInterface) {}

  execute = async (): Promise<OutputFindAllPostDto[]> => {
    const postsItems = await this.postRepository.findAll();

    return postsItems.map((item) => ({
      description: item.description,
      imgs: item.imgs,
      tags: item.tags,
      title: item.title,
      userId: item.userId,
    }));
  };
}
