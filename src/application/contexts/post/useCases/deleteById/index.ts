import { AppError } from '@/application/errors/AppError';
import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import { DeletePostUseCaseInterface } from './DeletePostUseCaseInterface';

export class DeletePostUseCase implements DeletePostUseCaseInterface {
  constructor(private _postRepository: PostRepositoryInterface) {}

  execute = async (idPost: string, userId: string): Promise<void> => {
    const post = await this._postRepository.findById(idPost);
    if (!post) {
      throw new AppError('POST_NOT_EXISTS', { idPost, userId });
    }

    post.delete();

    this._postRepository.update(post);
  };
}
