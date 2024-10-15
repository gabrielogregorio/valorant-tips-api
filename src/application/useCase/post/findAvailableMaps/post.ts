import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';

export class FindAvailableMapsUseCase {
  constructor(private postRepository: PostAggregateRepositoryInterface) {}

  execute = async (): Promise<string[]> => this.postRepository.findAvailableMaps();
}
