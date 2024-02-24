import { Request, Response } from 'express';
import { DashboardService, IDashboardServiceType } from '@/service/dashboard';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor(dashboardService: DashboardService) {
    this.dashboardService = dashboardService;
  }

  get = async (_req: Request, res: Response<IDashboardServiceType>) => {
    const data = await this.dashboardService.count();

    return res.json(data);
  };
}
