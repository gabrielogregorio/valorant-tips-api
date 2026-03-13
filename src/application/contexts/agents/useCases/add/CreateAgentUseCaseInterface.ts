export interface CreateAgentUseCaseOutputDtoInterface {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CreateAgentUseCaseInterface {
  execute: (map: string, imageUrl: string) => Promise<CreateAgentUseCaseOutputDtoInterface>;
}
