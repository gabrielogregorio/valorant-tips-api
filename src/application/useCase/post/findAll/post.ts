import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { UserEntity } from '../../../../domain/user/entity/user';
import { UserRepositoryInterface } from '../../../../domain/user/repository/userRepository.interface';
import { FindAllPostUseCaseInterface, OutputFindAllPostDto } from './FindAllPostUseCaseInterface';

export class FindAllPostUseCase implements FindAllPostUseCaseInterface {
  constructor(
    private postRepository: PostAggregateRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  execute = async (): Promise<OutputFindAllPostDto[]> => {
    const postsItems = await this.postRepository.findAll();
    if (postsItems.length === 0) {
      return [];
    }

    const users = await this.userRepository.findByIds([...new Set(postsItems.map((user) => user.userId))]);

    const userMap = users.reduce(
      (acc, user) => {
        acc[user.id] = user;
        return acc;
      },
      {} as Record<string, UserEntity>,
    );

    return postsItems.map((post) => ({
      id: post.id,
      description: post.description,
      imgs: post.imgs,
      tags: post.tags,
      title: post.title,
      user: {
        image: userMap[post.id]?.image || '',
        username: userMap[post.id]?.username || '',
      },
    }));
  };
}
