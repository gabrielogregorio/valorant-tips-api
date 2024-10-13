import express from 'express';
import { useValidation } from '@/middlewares/useValidation';
import { schemaAuth } from '@/schemas/makeAuth';
import { AppDependencyInjector } from '../container';

export const authRouter = express.Router();

const { authController } = AppDependencyInjector;

authRouter.post('/', useValidation({ body: schemaAuth }), authController.auth);
