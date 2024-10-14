import { userAuth } from '@/middlewares/userAuth';
import { Router } from 'express';
import { AppDependencyInjector } from '../container';

export const dashboardRouter = Router();

const { dashboardController } = AppDependencyInjector;

dashboardRouter.get('/', userAuth, dashboardController.get);
