import express, { Request, Response, Router } from 'express';
import { DashboardService, IDashboardServiceType } from '@/service/dashboard';
import { userAuth } from '@/middlewares/userAuth';
import statusCode from '../config/statusCode';

const dashboardController: Router = express.Router();

dashboardController.get('/dashboard', userAuth, async (_req: Request, res: Response): Promise<Response> => {
  try {
    const data: IDashboardServiceType = await DashboardService.count();
    return res.json(data);
  } catch (error) {
    return res.sendStatus(statusCode.ERROR_IN_SERVER.code);
  }
});

export default dashboardController;
