import { userAuth } from '@/middlewares/userAuth';
import { Router } from 'express';
import { DependencyController } from '../container';

export const dashboardRouter = Router();

const { dashboardController } = DependencyController;

dashboardRouter.get('/dashboard', userAuth, dashboardController.get);
