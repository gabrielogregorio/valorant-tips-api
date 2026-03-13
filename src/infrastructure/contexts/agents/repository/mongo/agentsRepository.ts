import { AgentsRepositoryInterface } from '@/domain/contexts/contexts/agents/repository';
import { AgentsEntity } from '@/domain/contexts/contexts/agents/entity';
import { Agents } from './Agents';

export class AgentsRepository implements AgentsRepositoryInterface {
  update = async (mapEntity: AgentsEntity): Promise<AgentsEntity> => {
    const existing = await Agents.findOne({ id: mapEntity.id.getValue() });

    if (!existing) {
      throw new Error('Map not found');
    }

    existing.name = mapEntity.name;
    existing.imageUrl = mapEntity.imageUrl;

    await existing.save();

    return AgentsEntity.restore({
      id: existing.id,
      name: existing.name ?? '',
      imageUrl: existing.imageUrl ?? '',
    });
  };

  save = async (mapEntity: AgentsEntity): Promise<AgentsEntity> => {
    const newMap = new Agents({
      imageUrl: mapEntity.imageUrl,
      name: mapEntity.name,
      id: mapEntity.id.getValue(),
    });

    await newMap.save();

    return AgentsEntity.restore({
      imageUrl: newMap.imageUrl ?? '',
      name: newMap.name ?? '',
      id: newMap.id,
    });
  };

  findAll = async (): Promise<AgentsEntity[]> => {
    const agents = await Agents.find();

    return agents.map((agent) =>
      AgentsEntity.restore({ imageUrl: agent.imageUrl ?? '', name: agent.name ?? '', id: agent.id }),
    );
  };

  findByName = async (name: string): Promise<AgentsEntity | null> => {
    const agent = await Agents.findOne({ name });
    if (!agent) {
      return null;
    }

    return AgentsEntity.restore({
      id: agent.id,
      imageUrl: agent.imageUrl ?? '',
      name: agent.name ?? '',
    });
  };

  findByIds = async (ids: string[]): Promise<AgentsEntity[]> => {
    const agents = await Agents.find({
      id: {
        $in: ids,
      },
    });

    return agents.map((agent) =>
      AgentsEntity.restore({
        id: agent.id,
        imageUrl: agent.imageUrl ?? '',
        name: agent.name ?? '',
      }),
    );
  };

  findById = async (id: string): Promise<AgentsEntity | null> => {
    const agent = await Agents.findOne({
      id,
    });

    if (!agent) {
      return null;
    }

    return AgentsEntity.restore({
      id: agent.id,
      imageUrl: agent.imageUrl ?? '',
      name: agent.name ?? '',
    });
  };
}
