import { Router } from 'express';
import { DependencyController } from '../container';

export const viewsRouter = Router();

const { viewsController } = DependencyController;

viewsRouter.post('/views', viewsController.create);
viewsRouter.get('/views', viewsController.get);
