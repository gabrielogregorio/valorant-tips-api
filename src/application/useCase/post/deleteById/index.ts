import { PostRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { AppError } from '../../../errors/AppError';
import { DeletePostUseCaseInterface } from './DeletePostUseCaseInterface';

export class DeletePostUseCase implements DeletePostUseCaseInterface {
  constructor(private postRepository: PostRepositoryInterface) {}

  execute = async (idPost: string, userId: string): Promise<void> => {
    const post = await this.postRepository.findById(idPost);
    if (!post) {
      throw new AppError('POST_NOT_EXISTS');
    }

    if (!post?.userId || !userId || post?.userId !== userId) {
      // você não pode deletar posts que não sejam seus
      throw new AppError('NO_CAN_DELETE_POST_ANOTHER_USER');
    }

    this.postRepository.deleteById(idPost);
  };
}
