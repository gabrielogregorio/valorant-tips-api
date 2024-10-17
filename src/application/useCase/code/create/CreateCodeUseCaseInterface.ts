export interface OutputCreateCodeDto {
  code: string;
  available: boolean;
  id: string;
}

export interface CreateCodeUseCaseInterface {
  execute: () => Promise<OutputCreateCodeDto>;
}
