import { RepositoryInterface } from '@/domain/common/repository/customRepository.interface';
import { ViewsEntity } from '@/domain/views/entity';

export interface ViewsRepositoryInterface extends RepositoryInterface<ViewsEntity> {
  save: (view: ViewsEntity) => Promise<ViewsEntity>;
  findAll: () => Promise<ViewsEntity[]>;
  findAllDistinctIp: () => Promise<string[]>;
}
