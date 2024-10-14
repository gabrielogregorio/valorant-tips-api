import { IImagePost, IPost } from '@/interfaces/post';
import { DataPost, factoryPostType } from '@/factories/dataPost';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { PostInfraRepository } from '@/repositories/postRepository';

export class PostService {
  private postRepository: PostInfraRepository;

  constructor(postRepository: PostInfraRepository) {
    this.postRepository = postRepository;
  }

  create = async ({ title, description, user, tags, imgs }: IPost): Promise<IPost> =>
    this.postRepository.create({ title, description, user, tags, imgs });

  updatePost = async (payload: Partial<IPost> & { postId: string }) => {
    const { title, description, tags, imgs, postId, user } = payload;

    const newImgs: IImagePost[] = [];
    imgs?.forEach((img) => {
      newImgs.push({
        description: img.description,
        _id: img._id,
        image: img.image,
      });
    });

    const updatePayload = {
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      user,
      ...(tags !== undefined ? { tags } : {}),
      ...(imgs !== undefined ? { imgs: newImgs } : {}),
    };

    const postService: IPost = await this.findByIdAndUpdate(postId, {
      ...updatePayload,
    });
    return DataPost.Build(postService);
  };

  findByIdAndUpdate = async (id: string, postUpdated: Partial<IPost>): Promise<IPost> => {
    const post = await this.postRepository.findByIdAndUpdate(id, postUpdated);
    if (!post) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return post;
  };

  findByIdOrThrow = async (id: string, options?: { returnUserId: boolean }): Promise<factoryPostType> => {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS, `post ${id} not exists`);
    }

    return DataPost.Build(post, options);
  };

  findAvailableMaps = async (): Promise<string[]> => this.postRepository.findAvailableMaps();

  findAvailableAgents = async (map: string): Promise<string[]> => this.postRepository.findAvailableAgents(map);

  FindAll = async (): Promise<factoryPostType[]> => {
    const postsItems = await this.postRepository.findAll();

    const posts: factoryPostType[] = [];
    postsItems.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return posts;
  };

  FindAllByMapAndAgent = async (agent: string, map: string): Promise<factoryPostType[]> => {
    const postItems = await this.postRepository.findAllByMapAndAgent(agent, map);

    const posts: factoryPostType[] = [];
    postItems.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return posts;
  };

  deleteById = async (idPost: string, userId: string) => {
    const post = await this.findByIdOrThrow(idPost, { returnUserId: true });
    if (post?.user?.id !== userId) {
      throw new AppError(errorStates.FORBIDDEN);
    }

    const postDeleted = this.postRepository.deleteById(idPost);

    if (postDeleted === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return postDeleted;
  };
}
