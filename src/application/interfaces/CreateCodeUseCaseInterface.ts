export interface OutputCreateCodeDto {
  code: string;
  available: boolean;
}

export interface CreateCodeUseCaseInterface {
  execute: () => Promise<OutputCreateCodeDto>;
}
