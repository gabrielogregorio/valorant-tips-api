export interface UpdateMapUseCaseOutputDtoInterface {
  id: string;
  name: string;
  imageUrl?: string;
}

interface UpdateMapUseCaseInputDtoInterface {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface UpdateMapUseCaseInterface {
  execute: (payload: UpdateMapUseCaseInputDtoInterface) => Promise<UpdateMapUseCaseOutputDtoInterface>;
}
