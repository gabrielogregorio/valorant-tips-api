import { AgentsRepositoryInterface } from '@/domain/contexts/contexts/agents/repository';
import { DomainError } from '@/domain/contexts/errors';
import {
  UpdateAgentMapInputInterface,
  UpdateAgentUseCaseInterface,
  UpdateAgentUseCaseInterfaceOutputDtoInterface,
} from './UpdateAgentUseCaseInterface';

export class UpdateAgentUseCase implements UpdateAgentUseCaseInterface {
  constructor(private _agentRepository: AgentsRepositoryInterface) {}

  execute = async ({
    id,
    name,
    imageUrl,
  }: UpdateAgentMapInputInterface): Promise<UpdateAgentUseCaseInterfaceOutputDtoInterface> => {
    const existingMap = await this._agentRepository.findById(id);

    if (!existingMap) {
      throw new DomainError('NotFound', `map id '${id}' not found`, {});
    }

    const mapWithSameName = await this._agentRepository.findByName(name);

    if (mapWithSameName && mapWithSameName.id.getValue() !== id) {
      throw new DomainError('AlreadyExists', `map name '${name}' already exists`, { name });
    }

    existingMap.changeName(name);

    if (imageUrl) {
      existingMap.changeImageUrl(imageUrl);
    }

    const updatedMap = await this._agentRepository.update(existingMap);

    return {
      id: updatedMap.id.getValue(),
      name: updatedMap.name,
      imageUrl: updatedMap.imageUrl,
    };
  };
}
