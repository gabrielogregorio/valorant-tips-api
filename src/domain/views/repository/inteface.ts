import { RepositoryInterface } from 'src/domain/@shared/repository/customRepository.interface';
import { ViewsEntity } from '../enttity';

export interface ViewsAggregateRepositoryInterface extends RepositoryInterface<ViewsEntity> {
  save: (view: ViewsEntity) => Promise<ViewsEntity>;
  findAll: () => Promise<ViewsEntity[]>;
  findAllDistinctIp: () => Promise<string[]>;
}
