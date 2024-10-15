import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { AppError } from '../../../../infrastructure/api/errors';
import { errorStates } from '../../../../infrastructure/api/errors/types';

export class DeletePostUseCase {
  constructor(private postRepository: PostAggregateRepositoryInterface) {}

  execute = async (idPost: string, userId: string): Promise<void> => {
    const post = await this.postRepository.findById(idPost);
    if (!post?.userId || !userId || post?.userId !== userId) {
      // você não pode deletar posts que não sejam seus
      throw new AppError(errorStates.FORBIDDEN);
    }

    const postDeleted = this.postRepository.deleteById(idPost);
    if (postDeleted === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }
  };
}
