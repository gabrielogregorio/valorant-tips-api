import express, { Router } from 'express';
import { userAuth } from '@/middlewares/userAuth';
import { useValidation } from '@/middlewares/useValidation';
import { schemaCreateUser } from '@/schemas/createUser';
import { schemaUpdateUser } from '@/schemas/updateUser';
import { useHasFile } from '@/middlewares/useHasFile';
import { useMulterUser } from '@/middlewares/useMulterUser';
import { AppDependencyInjector } from '../container';

export const userRouter: Router = express.Router();

const { userController } = AppDependencyInjector;

userRouter.post('/loadImageProfile', useHasFile, useMulterUser.single('image'), userController.uploadImage);
userRouter.post('/', useValidation({ body: schemaCreateUser }), userController.createUser);
userRouter.patch('/', useValidation({ body: schemaUpdateUser }), userAuth, userController.updateUser);
userRouter.get('/me', userAuth, userController.get);
userRouter.delete('/', userAuth, userController.delete);
