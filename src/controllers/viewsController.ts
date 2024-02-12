import { Request, Response } from 'express';
import { countViewsType, ViewService } from '@/service/View';

export class ViewsController {
  viewService: ViewService;

  constructor(viewService: ViewService) {
    this.viewService = viewService;
  }

  async create(req: Request, res: Response): Promise<Response> {
    const ip = req.socket.remoteAddress.split(`:`).pop();
    await this.viewService.Create(ip);
    return res.json({ msg: 'ok' });
  }

  async get(_req: Request, res: Response): Promise<Response> {
    const { countAll, countIps }: countViewsType = await this.viewService.CountViews();
    return res.json({ countAll, countIps });
  }
}
