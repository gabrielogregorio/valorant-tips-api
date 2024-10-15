export interface OutputFindUserByIdDto {
  username: string;
  image: string;
}

export interface FindUserByIdUseCaseInterface {
  execute: (id: string) => Promise<OutputFindUserByIdDto | null>;
}
