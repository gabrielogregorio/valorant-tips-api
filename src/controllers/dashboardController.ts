import { Request, Response } from 'express';
import { DashboardService, IDashboardServiceType } from '@/service/dashboard';

export class DashboardController {
  async get(_req: Request, res: Response): Promise<Response> {
    const data: IDashboardServiceType = await DashboardService.count();
    return res.json(data);
  }
}
