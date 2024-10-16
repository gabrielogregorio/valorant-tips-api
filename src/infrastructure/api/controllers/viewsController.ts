import { Request, Response } from 'express';
import { CreateViewUseCase } from '../../../application/useCase/views/add/View';
import { GetViewUseCase } from '../../../application/useCase/views/get/View';
import { AppError } from '../errors';
import { errorStates } from '../errors/types';

export class ViewsController {
  constructor(
    private createViewUseCase: CreateViewUseCase,
    private getViewUseCase: GetViewUseCase,
  ) {}

  create = async (req: Request, res: Response): Promise<Response> => {
    const ip = req.socket.remoteAddress?.split(`:`).pop();
    if (!ip) {
      throw new AppError(errorStates.PAYLOAD_IS_INVALID, "ip don't found");
    }
    await this.createViewUseCase.execute(ip);

    return res.sendStatus(204);
  };

  get = async (_req: Request, res: Response): Promise<Response> => {
    const { countAll, countIps } = await this.getViewUseCase.execute();

    return res.json({ countAll, countIps });
  };
}
