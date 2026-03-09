import { RepositoryInterface } from '@/domain/contexts/common/repository/customRepository.interface';
import { MapsEntity } from '../entity';

export interface MapsRepositoryInterface extends RepositoryInterface<MapsEntity> {
  save: (view: MapsEntity) => Promise<MapsEntity>;
  update: (view: MapsEntity) => Promise<MapsEntity>;
  findAll: () => Promise<MapsEntity[]>;
  findByName: (name: string) => Promise<MapsEntity | null>;
  findById: (id: string) => Promise<MapsEntity | null>;
  findByIds: (ids: string[]) => Promise<MapsEntity[]>;
}
