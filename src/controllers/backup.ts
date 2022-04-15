import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { BackupService } from '@/service/Backup';
import { userAuth } from '@/middlewares/userAuth';

dotenv.config();

const router: Router = express.Router();

router.get(
  '/backup',
  userAuth,
  async (req: Request, res: Response): Promise<Response> => res.json(await BackupService.start()),
);

export default router;
