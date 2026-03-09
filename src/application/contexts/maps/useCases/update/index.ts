import { MapsRepositoryInterface } from '@/domain/contexts/contexts/maps/repository';
import { DomainError } from '@/domain/contexts/errors';
import { UpdateMapUseCaseInterface, UpdateMapUseCaseOutputDtoInterface } from './UpdateMapUseCaseInterface copy';

interface UpdateMapInputInterface {
  id: string;
  name: string;
  imageUrl?: string;
}

export class UpdateMapUseCase implements UpdateMapUseCaseInterface {
  constructor(private _mapRepository: MapsRepositoryInterface) {}

  execute = async ({ id, name, imageUrl }: UpdateMapInputInterface): Promise<UpdateMapUseCaseOutputDtoInterface> => {
    const existingMap = await this._mapRepository.findById(id);

    if (!existingMap) {
      throw new DomainError('NotFound', `map id '${id}' not found`, {});
    }

    const mapWithSameName = await this._mapRepository.findByName(name);

    if (mapWithSameName && mapWithSameName.id.getValue() !== id) {
      throw new DomainError('AlreadyExists', `map name '${name}' already exists`, { name });
    }

    existingMap.changeName(name);

    if (imageUrl) {
      existingMap.changeImageUrl(imageUrl);
    }

    const updatedMap = await this._mapRepository.update(existingMap);

    return {
      id: updatedMap.id.getValue(),
      name: updatedMap.name,
      imageUrl: updatedMap.imageUrl,
    };
  };
}
