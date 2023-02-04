import express, { Request, Response, Router } from 'express';
import { countViewsType, ViewService } from '@/service/View';
import statusCode from '../config/statusCode';

const viewsController: Router = express.Router();

viewsController.post('/views', async (req: Request, res: Response): Promise<Response> => {
  try {
    const ip = req.socket.remoteAddress.split(`:`).pop();
    await ViewService.Create(ip);
    return res.json({ msg: 'ok' });
  } catch (error) {
    return res.sendStatus(statusCode.ERROR_IN_SERVER.code);
  }
});

viewsController.get('/views', async (_req: Request, res: Response): Promise<Response> => {
  try {
    const { countAll, countIps }: countViewsType = await ViewService.CountViews();
    return res.json({ countAll, countIps });
  } catch (error) {
    return res.sendStatus(statusCode.ERROR_IN_SERVER.code);
  }
});

export default viewsController;
