import { Router } from 'express';
import { AppDependencyInjector } from '../container';
import { uploadImageMiddleware } from '../middlewares/uploadImageMiddleware';

export const mapsRouter = Router();

const { mapsController } = AppDependencyInjector;

mapsRouter.post('/', uploadImageMiddleware.single('image'), mapsController.create);
mapsRouter.put('/:id', uploadImageMiddleware.single('image'), mapsController.update);
mapsRouter.get('/', mapsController.getAll);
