import express from 'express';
import { middlewareValidation } from '@/middlewares/validator';
import { schemaAuth } from '@/schemas/makeAuth';
import { DependencyController } from '../container';

export const authRouter = express.Router();

const { authController } = DependencyController;

authRouter.post('/', middlewareValidation(schemaAuth), authController.auth);
