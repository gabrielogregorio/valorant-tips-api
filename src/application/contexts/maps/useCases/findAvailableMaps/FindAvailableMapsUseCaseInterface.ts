export interface FindAvailableMapsUseCaseOutputDtoInterface {
  id: string;
  name: string;
  imageUrl: string;
}

export interface FindAvailableMapsUseCaseInterface {
  execute: () => Promise<FindAvailableMapsUseCaseOutputDtoInterface[]>;
}
