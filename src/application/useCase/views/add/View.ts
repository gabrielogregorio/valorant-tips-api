import { ViewsAggregateRepositoryInterface } from '../../../../domain/views/repository/inteface';
import { ViewsEntity } from '../../../../domain/views/enttity';
import { CreateViewUseCaseInterface } from '../../../interfaces/CreateViewUseCaseInterface';

export class CreateViewUseCase implements CreateViewUseCaseInterface {
  constructor(private viewRepository: ViewsAggregateRepositoryInterface) {}

  execute = async (ip: string): Promise<void> => {
    const view = new ViewsEntity({
      ip,
    });

    await this.viewRepository.save(view);
  };
}
