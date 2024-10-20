import { Request, Response } from 'express';

export type IDashboardServiceType = {
  countAll: number;
  countIps: number;
  countAllPosts: number;
  countAlMaps: number;
  countAlAgents: number;
  countAllSuggestions: number;
  countAllUsers: number;
};

export interface DashboardControllerInterface {
  get: (req: Request, res: Response<IDashboardServiceType>) => Promise<Response>;
}
