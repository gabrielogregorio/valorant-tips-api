export interface UpdateAgentUseCaseInterfaceOutputDtoInterface {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface UpdateAgentMapInputInterface {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface UpdateAgentUseCaseInterface {
  execute: (payload: UpdateAgentMapInputInterface) => Promise<UpdateAgentUseCaseInterfaceOutputDtoInterface>;
}
