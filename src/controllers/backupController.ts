import express, { Request, Response, Router } from 'express';
import { BackupService } from '@/service/Backup';
import { userAuth } from '@/middlewares/userAuth';

const backupController: Router = express.Router();

backupController.get(
  '/backup',
  userAuth,
  async (_req: Request, res: Response): Promise<Response> => res.json(await BackupService.start()),
);

export default backupController;
