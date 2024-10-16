import { Request, Response } from 'express';
import { InsightsUseCaseInterface } from '../../../application/interfaces/InsightsUseCaseInterface';

type IDashboardServiceType = {
  countAll: number;
  countIps: number;
  countAllPosts: number;
  countAlMaps: number;
  countAlAgents: number;
  countAllSuggestions: number;
  countAllUsers: number;
};

export class DashboardController {
  constructor(private insightsUseCase: InsightsUseCaseInterface) {}

  get = async (_req: Request, res: Response<IDashboardServiceType>) => {
    const data = await this.insightsUseCase.execute();

    return res.json({
      countAlAgents: data.countAlAgents,
      countAll: data.countAll,
      countAllPosts: data.countAllPosts,
      countAllSuggestions: data.countAllSuggestions,
      countAllUsers: data.countAllUsers,
      countAlMaps: data.countAlMaps,
      countIps: data.countIps,
    });
  };
}
