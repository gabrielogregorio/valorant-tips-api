import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { BackupService } from '@/service/Backup';
import { userAuth } from '@/middlewares/userAuth';

dotenv.config();

const router = express.Router();

router.get('/backup', userAuth, async (req: Request, res: Response) => res.json(await BackupService.start()));

export default router;
