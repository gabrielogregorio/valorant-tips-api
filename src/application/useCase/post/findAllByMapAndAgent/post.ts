import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { InputFindByMapAndAgenteDto, OutputFindByMapAndAgenteDto } from './findByMapAndAgente.dto';

export class FindAllByMapAndAgentUseCase {
  constructor(private postRepository: PostAggregateRepositoryInterface) {}

  execute = async (payload: InputFindByMapAndAgenteDto): Promise<OutputFindByMapAndAgenteDto[]> => {
    const postItems = await this.postRepository.findAllByMapAndAgent(payload.agent, payload.map);

    return postItems.map((item) => ({
      description: item.description,
      imgs: item.imgs,
      tags: item.tags,
      title: item.title,
      userId: item.userId,
    }));
  };
}
