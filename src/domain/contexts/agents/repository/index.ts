import { RepositoryInterface } from '@/domain/contexts/common/repository/customRepository.interface';
import { AgentsEntity } from '@/domain/contexts/contexts/agents/entity';

export interface AgentsRepositoryInterface extends RepositoryInterface<AgentsEntity> {
  save: (agent: AgentsEntity) => Promise<AgentsEntity>;
  update: (agent: AgentsEntity) => Promise<AgentsEntity>;
  findAll: () => Promise<AgentsEntity[]>;
  findById: (id: string) => Promise<AgentsEntity | null>;
  findByName: (name: string) => Promise<AgentsEntity | null>;
  findByIds: (ids: string[]) => Promise<AgentsEntity[]>;
}
