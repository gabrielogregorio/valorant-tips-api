import { Router } from 'express';
import { userAuth } from '@/api/middlewares/userAuth';
import { AppDependencyInjector } from '../container';
import { uploadImagesMiddleware } from '../middlewares/uploadImageMiddleware';

export const postRouter: Router = Router();

const { postController } = AppDependencyInjector;

postRouter.post('/', userAuth, uploadImagesMiddleware.any(), postController.createPost);
postRouter.put('/:id', userAuth, uploadImagesMiddleware.any(), postController.updatePost);

postRouter.get('/:id', userAuth, postController.get);
postRouter.get('/', postController.getPosts);
postRouter.get('/:map/:agent', postController.getPostsByMapAndAgent);
postRouter.delete('/:id', userAuth, postController.delete);
