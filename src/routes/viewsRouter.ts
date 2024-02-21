import { Router } from 'express';
import { DependencyController } from '../container';

export const viewsRouter = Router();

const { viewsController } = DependencyController;

viewsRouter.post('/', viewsController.create);
viewsRouter.get('/', viewsController.get);
