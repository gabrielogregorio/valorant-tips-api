import { MapsRepositoryInterface } from '@/domain/contexts/contexts/maps/repository';
import { DomainError } from '@/domain/contexts/errors';
import { MapsEntity } from '@/domain/contexts/contexts/maps/entity';
import { CreateMapUseCaseInterface, CreateMapUseCaseOutputDtoInterface } from './CreateMapUseCaseInterface';

export class CreateMapUseCase implements CreateMapUseCaseInterface {
  constructor(private _mapRepository: MapsRepositoryInterface) {}

  execute = async (name: string, imageUrl: string): Promise<CreateMapUseCaseOutputDtoInterface> => {
    if (await this._mapRepository.findByName(name)) {
      throw new DomainError('AlreadyExists', `map name '${name}' already exists`, {
        name,
      });
    }
    const maps = MapsEntity.create({
      imageUrl,
      name,
    });

    const mapCreated = await this._mapRepository.save(maps);
    return {
      id: mapCreated.id.getValue(),
      imageUrl: mapCreated.imageUrl,
      name: mapCreated.name,
    };
  };
}
