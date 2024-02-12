import { Request, Response } from 'express';
import { countViewsType, ViewService } from '@/service/View';

export class ViewsController {
  async create(req: Request, res: Response): Promise<Response> {
    const ip = req.socket.remoteAddress.split(`:`).pop();
    await ViewService.Create(ip);
    return res.json({ msg: 'ok' });
  }

  async get(_req: Request, res: Response): Promise<Response> {
    const { countAll, countIps }: countViewsType = await ViewService.CountViews();
    return res.json({ countAll, countIps });
  }
}
