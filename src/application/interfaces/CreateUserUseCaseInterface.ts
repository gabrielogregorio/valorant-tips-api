export interface InputCreateUserDto {
  username: string;
  password: string;
  image: string;
}

export interface CreateUserUseCaseInterface {
  execute: (payload: InputCreateUserDto) => Promise<void>;
}
