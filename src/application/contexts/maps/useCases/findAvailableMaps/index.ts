import { PostRepositoryInterface } from '@/domain/contexts/contexts/post/repository';
import { MapsRepositoryInterface } from '@/domain/contexts/contexts/maps/repository';
import {
  FindAvailableMapsUseCaseInterface,
  FindAvailableMapsUseCaseOutputDtoInterface,
} from './FindAvailableMapsUseCaseInterface';

export class FindAvailableMapsUseCase implements FindAvailableMapsUseCaseInterface {
  constructor(
    private _postRepository: PostRepositoryInterface,
    private _mapsRepository: MapsRepositoryInterface,
  ) {}

  execute = async (): Promise<FindAvailableMapsUseCaseOutputDtoInterface[]> => {
    const mapIds = await this._postRepository.findMapsInPosts();

    const maps = await this._mapsRepository.findByIds(mapIds);

    return maps.map((map) => ({
      id: map.id.getValue(),
      imageUrl: map.imageUrl,
      name: map.name,
    }));
  };
}
