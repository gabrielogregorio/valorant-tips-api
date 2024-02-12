import { Request, Response } from 'express';
import { DashboardService, IDashboardServiceType } from '@/service/dashboard';

export class DashboardController {
  private dashboardService: DashboardService;

  constructor(dashboardService: DashboardService) {
    this.dashboardService = dashboardService;
  }

  get = async (_req: Request, res: Response): Promise<Response> => {
    const data: IDashboardServiceType = await this.dashboardService.count();
    return res.json(data);
  };
}
