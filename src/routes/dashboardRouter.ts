import { userAuth } from '@/middlewares/userAuth';
import { Router } from 'express';
import { DependencyController } from 'src/container';

export const dashboardRouter = Router();

const { DashboardController } = DependencyController;

dashboardRouter.get('/dashboard', userAuth, DashboardController.get);
