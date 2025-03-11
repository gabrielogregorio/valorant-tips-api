export interface CreateAgentUseCaseInterfaceOutputDtoInterface {
  id: string;
  name: string;
  imageUrl: string;
}

export interface CreateAgentUseCaseInterface {
  execute: (map: string, imageUrl: string) => Promise<CreateAgentUseCaseInterfaceOutputDtoInterface>;
}
