import express, { Request, Response, Router } from 'express';
import { DashboardService, IDashboardServiceType } from '@/service/dashboard';
import { userAuth } from '@/middlewares/userAuth';

const dashboardController: Router = express.Router();

dashboardController.get('/dashboard', userAuth, async (_req: Request, res: Response): Promise<Response> => {
  const data: IDashboardServiceType = await DashboardService.count();
  return res.json(data);
});

export default dashboardController;
