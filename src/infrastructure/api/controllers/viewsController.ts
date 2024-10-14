import { Request, Response } from 'express';
import { ViewService } from '@/service/View';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';

export class ViewsController {
  private viewService: ViewService;

  constructor(viewService: ViewService) {
    this.viewService = viewService;
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const ip = req.socket.remoteAddress?.split(`:`).pop();
    if (!ip) {
      throw new AppError(errorStates.PAYLOAD_IS_INVALID, "ip don't found");
    }

    await this.viewService.create(ip);
    return res.sendStatus(204);
  };

  get = async (_req: Request, res: Response): Promise<Response> => {
    const { countAll, countIps } = await this.viewService.countViews();
    return res.json({ countAll, countIps });
  };
}
