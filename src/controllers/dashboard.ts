import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { DashboardService } from '@/service/dashboard';
import { userAuth } from '@/middlewares/userAuth';

dotenv.config();

const router = express.Router();

router.get('/dashboard', userAuth, async (req: Request, res: Response): Promise<Response> => {
  try {
    const data = await DashboardService.count();
    return res.json(data);
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default router;
