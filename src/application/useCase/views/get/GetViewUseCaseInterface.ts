export interface OutputGetViewsDto {
  countAll: number;
  countIps: number;
}

export interface GetViewUseCaseInterface {
  execute: () => Promise<OutputGetViewsDto>;
}
