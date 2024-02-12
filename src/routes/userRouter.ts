import express, { Router } from 'express';
import { userAuth } from '@/middlewares/userAuth';
import { multerUser } from '@/middlewares/multerUser';
import { DependencyController } from 'src/container';

export const userRouter: Router = express.Router();

const { userController } = DependencyController;

userRouter.post('/userLoadFile', multerUser.single('image'), userController.uploadImage);
userRouter.post('/auth', userController.auth);
userRouter.put('/user', userAuth, userController.updateUser);
userRouter.get('/user', userAuth, userController.get);
userRouter.delete('/user', userAuth, userController.delete);
