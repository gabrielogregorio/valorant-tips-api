export interface InputLoginUseCaseDto {
  username: string;
  password: string;
}

export interface OutputLoginUseCaseDto {
  token: string;
  id: string;
}
export interface LoginUseCaseInterface {
  execute: (payload: InputLoginUseCaseDto) => Promise<OutputLoginUseCaseDto>;
}
