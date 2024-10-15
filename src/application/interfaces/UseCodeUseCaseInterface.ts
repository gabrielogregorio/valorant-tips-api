export interface OutputUseCodeDto {
  code: string;
  available: boolean;
}

export interface UseCodeUseCaseInterface {
  execute(code: string): Promise<OutputUseCodeDto>;
}
