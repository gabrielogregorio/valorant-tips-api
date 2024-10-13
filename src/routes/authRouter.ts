import express from 'express';
import { middlewareValidation } from '@/middlewares/validator';
import { schemaAuth } from '@/schemas/makeAuth';
import { AppDependencyInjector } from '../container';

export const authRouter = express.Router();

const { authController } = AppDependencyInjector;

authRouter.post('/', middlewareValidation(schemaAuth), authController.auth);
