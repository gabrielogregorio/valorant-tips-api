import { MapsRepositoryInterface } from '@/domain/contexts/contexts/maps/repository';
import { MapsEntity } from '@/domain/contexts/contexts/maps/entity';
import { Maps } from './Maps';

export class MapsRepository implements MapsRepositoryInterface {
  constructor() {}

  update = async (mapEntity: MapsEntity): Promise<MapsEntity> => {
    const existing = await Maps.findOne({ id: mapEntity.id.getValue() });

    if (!existing) {
      throw new Error('Map not found');
    }

    existing.name = mapEntity.name;
    existing.imageUrl = mapEntity.imageUrl;

    await existing.save();

    return MapsEntity.restore({
      id: existing.id,
      name: existing.name ?? '',
      imageUrl: existing.imageUrl ?? '',
    });
  };

  save = async (mapEntity: MapsEntity): Promise<MapsEntity> => {
    const newMap = new Maps({
      imageUrl: mapEntity.imageUrl,
      name: mapEntity.name,
      id: mapEntity.id.getValue(),
    });

    await newMap.save();

    return MapsEntity.restore({
      imageUrl: newMap.imageUrl ?? '',
      name: newMap.name ?? '',
      id: newMap.id,
    });
  };

  findAll = async (): Promise<MapsEntity[]> => {
    const maps = await Maps.find();

    return maps.map((map) => MapsEntity.restore({ imageUrl: map.imageUrl ?? '', name: map.name ?? '', id: map.id }));
  };

  findByName = async (name: string): Promise<MapsEntity | null> => {
    const map = await Maps.findOne({ name });
    if (!map) {
      return null;
    }

    return MapsEntity.restore({
      id: map.id,
      imageUrl: map.imageUrl ?? '',
      name: map.name ?? '',
    });
  };

  findById = async (id: string): Promise<MapsEntity | null> => {
    const map = await Maps.findOne({ id });
    if (!map) {
      return null;
    }

    return MapsEntity.restore({
      id: map.id,
      imageUrl: map.imageUrl ?? '',
      name: map.name ?? '',
    });
  };

  findByIds = async (ids: string[]): Promise<MapsEntity[]> => {
    const maps = await Maps.find({
      id: {
        $in: ids,
      },
    });

    return maps.map((map) =>
      MapsEntity.restore({
        id: map.id,
        imageUrl: map.imageUrl ?? '',
        name: map.name ?? '',
      }),
    );
  };
}
