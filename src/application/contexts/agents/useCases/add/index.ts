import { AgentsRepositoryInterface } from '@/domain/contexts/contexts/agents/repository';
import { AgentsEntity } from '@/domain/contexts/contexts/agents/entity';
import { DomainError } from '@/domain/contexts/errors';
import {
  CreateAgentUseCaseInterface,
  CreateAgentUseCaseInterfaceOutputDtoInterface,
} from './CreateAgentUseCaseInterface';

export class CreateAgentUseCase implements CreateAgentUseCaseInterface {
  constructor(private _agentRepository: AgentsRepositoryInterface) {}

  execute = async (name: string, imageUrl: string): Promise<CreateAgentUseCaseInterfaceOutputDtoInterface> => {
    if (await this._agentRepository.findByName(name)) {
      throw new DomainError('AlreadyExists', `agent name '${name}' already exists`, {
        name,
      });
    }

    const agent = AgentsEntity.create({
      imageUrl,
      name,
    });

    const agentCreated = await this._agentRepository.save(agent);
    return {
      id: agentCreated.id.getValue(),
      imageUrl: agentCreated.imageUrl,
      name: agentCreated.name,
    };
  };
}
