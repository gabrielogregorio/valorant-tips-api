export interface CreateMapUseCaseOutputDtoInterface {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CreateMapUseCaseInterface {
  execute: (map: string, image: string) => Promise<CreateMapUseCaseOutputDtoInterface>;
}
