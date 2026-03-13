export interface FindAvailableAgentsByMapsUseCaseOutputDtoInterface {
  id: string;
  name: string;
  imageUrl: string;
}

export interface FindAvailableAgentsByMapsUseCaseInterface {
  execute: (mapId: string) => Promise<FindAvailableAgentsByMapsUseCaseOutputDtoInterface[]>;
}
