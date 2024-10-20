export interface InsightsOutputDto {
  countAll: number;
  countIps: number;
  countAllPosts: number;
  countAlMaps: number;
  countAlAgents: number;
  countAllSuggestions: number;
  countAllUsers: number;
}

export interface InsightsUseCaseInterface {
  execute: () => Promise<InsightsOutputDto>;
}
