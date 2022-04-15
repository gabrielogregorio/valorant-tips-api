import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { ViewService } from '@/service/View';

dotenv.config();

const router = express.Router();

router.post('/views', async (req: Request, res: Response): Promise<Response> => {
  try {
    const ip = req.socket.remoteAddress.split(`:`).pop();
    await ViewService.Create(ip);
    return res.json({ msg: 'ok' });
  } catch (error) {
    return res.sendStatus(500);
  }
});

router.get('/views', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { countAll, countIps } = await ViewService.CountViews();
    return res.json({ countAll, countIps });
  } catch (error) {
    return res.sendStatus(500);
  }
});

export default router;
