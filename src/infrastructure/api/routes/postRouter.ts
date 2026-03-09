import { Router } from 'express';
import { userAuth } from '@/api/middlewares/userAuth';
import { AppDependencyInjector } from '../container';
import { uploadPostImagesMiddleware } from '../middlewares/uploadPostImagesMiddleware';

export const postRouter: Router = Router();

const { postController } = AppDependencyInjector;

postRouter.post('/', userAuth, uploadPostImagesMiddleware.any(), postController.createPost);
postRouter.put('/:id', userAuth, uploadPostImagesMiddleware.any(), postController.updatePost);

postRouter.post('/', userAuth, postController.createPost);
postRouter.put('/:id', userAuth, postController.updatePost);
postRouter.get('/:id', userAuth, postController.get);
postRouter.get('/', postController.getPosts);
postRouter.get('/:map/:agent', postController.getPostsByMapAndAgent);
postRouter.delete('/:id', userAuth, postController.delete);
