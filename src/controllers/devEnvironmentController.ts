import express, { Request, Response, Router } from 'express';
import { DevEnvironmentService } from '@/service/DevEnvironment';
import { MODE_RUN } from '@/config/envs';

const devEnvironmentController: Router = express.Router();

devEnvironmentController.get('/prepare_dev_environment', async (_req: Request, res: Response): Promise<Response> => {
  if (MODE_RUN === 'DEVELOP') {
    await DevEnvironmentService.Create();
    return res.json({ msg: 'Environment create success' });
  }

  return res.json({ msg: 'Ops' });
});

export default devEnvironmentController;
