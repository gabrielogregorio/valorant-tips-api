import { API_VERSION } from '@/config/envs';
import { Router, Request, Response } from 'express';

export const baseRouter = Router();

baseRouter.get('/', (_req: Request, res: Response): Response => res.send(`api is running in version ${API_VERSION}`));
