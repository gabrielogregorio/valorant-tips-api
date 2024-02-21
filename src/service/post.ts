import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { PostRepository } from '@/repositories/postRepository';
import { IPost } from '@/interfaces/post';

export class PostService {
  private postRepository: PostRepository;

  constructor(postRepository: PostRepository) {
    this.postRepository = postRepository;
  }

  create = async ({ title, description, user, tags, imgs }: IPost): Promise<IPost> =>
    this.postRepository.create({ title, description, user, tags, imgs });

  findByIdAndUpdate = async (id: string, postUpdated: Partial<IPost>): Promise<IPost> => {
    const post = await this.postRepository.findByIdAndUpdate(id, postUpdated);
    if (!post) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return post;
  };

  findByIdOrThrow = async (id: string): Promise<IPost> => {
    const post = await this.postRepository.findById(id);
    if (!post) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS, `post ${id} not exists`);
    }

    return post;
  };

  findAvailableMaps = async (): Promise<string[]> => this.postRepository.findAvailableMaps();

  findAvailableAgents = async (map: string): Promise<string[]> => this.postRepository.findAvailableAgents(map);

  FindAll = async (): Promise<IPost[]> => this.postRepository.findAll();

  FindAllByMapAndAgent = async (agent: string, map: string): Promise<IPost[]> =>
    this.postRepository.findAllByMapAndAgent(agent, map);

  deleteById = async (idPost: string, userId: string): Promise<any> => {
    const post = await this.findByIdOrThrow(idPost);
    if (post.user._id.toString() !== userId) {
      throw new AppError(errorStates.FORBIDDEN);
    }

    return this.postRepository.deleteById(idPost);
  };
}
