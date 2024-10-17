import { Request, Response } from 'express';
import { InsightsUseCaseInterface } from '../../../application/useCase/dashboard/insights/InsightsUseCaseInterface';
import { DashboardControllerInterface, IDashboardServiceType } from './interfaces/DashboardControllerInterface';

export class DashboardController implements DashboardControllerInterface {
  constructor(private insightsUseCase: InsightsUseCaseInterface) {}

  async get(_req: Request, res: Response<IDashboardServiceType>) {
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
  }
}
