import express from 'express';
import { useValidation } from '@/infrastructure/api/middlewares/useValidation';
import { AppDependencyInjector } from '../container';
import { schemaAuth } from '../schemas/makeAuth.schema';

export const authRouter = express.Router();

const { authController } = AppDependencyInjector;

authRouter.post('/', useValidation({ body: schemaAuth }), authController.auth);
