import { Router } from 'express';
import { AppDependencyInjector } from '../container';
import { uploadImageMiddleware } from '../middlewares/uploadImageMiddleware';

export const agentsRouter = Router();

const { agentsController } = AppDependencyInjector;

agentsRouter.post('/', uploadImageMiddleware.single('image'), agentsController.create);
agentsRouter.put('/:id', uploadImageMiddleware.single('image'), agentsController.update);
agentsRouter.get('/', agentsController.getAll);
agentsRouter.get('/:mapId/posts', agentsController.findAvailableAgentsByMaps);



// agentsRouter.get('/:id', agentsController.getAll);
