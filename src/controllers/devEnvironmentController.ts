import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { DevEnvironmentService } from '@/service/DevEnvironment';

dotenv.config();

const devEnvironmentController: Router = express.Router();

devEnvironmentController.get('/prepare_dev_environment', async (_req: Request, res: Response): Promise<Response> => {
  if (process.env.MODE_RUN === 'DEVELOP') {
    await DevEnvironmentService.Create();
    return res.json({ msg: 'Environment create success' });
  }

  return res.json({ msg: 'Ops' });
});

export default devEnvironmentController;
