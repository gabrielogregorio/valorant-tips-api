export interface InputCreateUserDto {
  username: string;
  password: string;
  image?: string;
}

export interface CreateUserUseCaseInterface {
  execute: (code: string, payload: InputCreateUserDto) => Promise<void>;
}
