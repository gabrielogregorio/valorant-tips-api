import { PostRepositoryInterface } from '@/domain/post/repository/postRepository.interface';
import { UserEntity } from '@/domain/user/entity/user';
import { UserRepositoryInterface } from '@/domain/user/repository/userRepository.interface';
import { FindAllPostUseCaseInterface, OutputFindAllPostDto } from './FindAllPostUseCaseInterface';

export class FindAllPostUseCase implements FindAllPostUseCaseInterface {
  constructor(
    private postRepository: PostRepositoryInterface,
    private userRepository: UserRepositoryInterface,
  ) {}

  execute = async (): Promise<OutputFindAllPostDto[]> => {
    const postsItems = await this.postRepository.findAll();
    if (postsItems.length === 0) {
      return [];
    }

    const ids = [...new Set(postsItems.map((user) => user.userId))];
    const users = await this.userRepository.findByIds(ids);

    const userMap: { [key: string]: UserEntity } = {};
    users.forEach((user) => {
      userMap[user.id] = user;
    });

    return postsItems.map((post) => ({
      id: post.id,
      description: post.description,
      imgs: post.imgs,
      tags: post.tags,
      title: post.title,
      user: {
        image: userMap[post.userId]?.image || '',
        username: userMap[post.userId]?.username || '',
      },
    }));
  };
}
