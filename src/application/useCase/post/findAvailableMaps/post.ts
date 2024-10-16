import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { FindAvailableMapsUseCaseInterface } from './FindAvailableMapsUseCaseInterface';

export class FindAvailableMapsUseCase implements FindAvailableMapsUseCaseInterface {
  constructor(private postRepository: PostAggregateRepositoryInterface) {}

  execute = async (): Promise<string[]> => this.postRepository.findAvailableMaps();
}
