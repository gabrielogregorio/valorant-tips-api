export interface OutputFindUserByUsernameDto {
  username: string;
  image: string;
}

export interface FindUserByUsernameUseCaseInterface {
  execute: (id: string) => Promise<OutputFindUserByUsernameDto | null>;
}
