import express, { Request, Response, Router } from 'express';
import { countViewsType, ViewService } from '@/service/View';

const viewsController: Router = express.Router();

viewsController.post('/views', async (req: Request, res: Response): Promise<Response> => {
  const ip = req.socket.remoteAddress.split(`:`).pop();
  await ViewService.Create(ip);
  return res.json({ msg: 'ok' });
});

viewsController.get('/views', async (_req: Request, res: Response): Promise<Response> => {
  const { countAll, countIps }: countViewsType = await ViewService.CountViews();
  return res.json({ countAll, countIps });
});

export default viewsController;
