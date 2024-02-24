import express, { Router } from 'express';
import { userAuth } from '@/middlewares/userAuth';
import { multerUser } from '@/middlewares/multerUser';
import { middlewareValidation } from '@/middlewares/validator';
import { schemaCreateUser } from '@/schemas/createUser';
import { schemaUpdateUser } from '@/schemas/updateUser';
import { useHasFile } from '@/middlewares/userHasFile';
import { AppDependencyInjector } from '../container';

export const userRouter: Router = express.Router();

const { userController } = AppDependencyInjector;

userRouter.post('/loadImageProfile', useHasFile, multerUser.single('image'), userController.uploadImage);
userRouter.post('/', middlewareValidation(schemaCreateUser), userController.createUser);
userRouter.patch('/', middlewareValidation(schemaUpdateUser), userAuth, userController.updateUser);
userRouter.get('/me', userAuth, userController.get);
userRouter.delete('/', userAuth, userController.delete);
