import { Router } from 'express';
import { DependencyController } from 'src/container';

export const viewsRouter = Router();

const { ViewsController } = DependencyController;

viewsRouter.post('/views', ViewsController.create);
viewsRouter.get('/views', ViewsController.get);
