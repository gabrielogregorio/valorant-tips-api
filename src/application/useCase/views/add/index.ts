import { ViewsRepositoryInterface } from '@/domain/views/repository/interface';
import { ViewsEntity } from '@/domain/views/entity';
import { CreateViewUseCaseInterface } from './CreateViewUseCaseInterface';

export class CreateViewUseCase implements CreateViewUseCaseInterface {
  constructor(private viewRepository: ViewsRepositoryInterface) {}

  execute = async (ip: string): Promise<void> => {
    const view = new ViewsEntity({
      ip,
    });

    await this.viewRepository.save(view);
  };
}
