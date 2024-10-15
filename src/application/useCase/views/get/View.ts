import { ViewsAggregateRepositoryInterface } from '../../../../domain/views/repository/inteface';
import { GetViewUseCaseInterface, OutputGetViewsDto } from '../../../interfaces/GetViewUseCaseInterface';

export class GetViewUseCase implements GetViewUseCaseInterface {
  constructor(private viewRepository: ViewsAggregateRepositoryInterface) {}

  execute = async (): Promise<OutputGetViewsDto> => {
    const count2 = await this.viewRepository.findAllDistinctIp();
    const count = await this.viewRepository.findAll();
    const countAll = count.length;
    const countIps = count2.length;

    return { countAll, countIps };
  };
}
