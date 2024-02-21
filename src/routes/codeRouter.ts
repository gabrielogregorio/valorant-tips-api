import { Router } from 'express';
import { middlewareValidation } from '@/middlewares/validator';
import { schemaCode } from '@/schemas/code';
import { DependencyController } from '../container';

const { codeController } = DependencyController;

export const codeRouter = Router();

codeRouter.post('/', middlewareValidation(schemaCode), codeController.generate);
