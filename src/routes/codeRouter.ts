import { Router } from 'express';
import { middlewareValidation } from '@/middlewares/validator';
import { schemaCode } from '@/schemas/code';
import { userAuthCodeIsCorrect } from '@/middlewares/userCodeIsCorrect';
import { AppDependencyInjector } from '../container';

const { codeController } = AppDependencyInjector;

export const codeRouter = Router();

codeRouter.post('/', userAuthCodeIsCorrect, middlewareValidation(schemaCode), codeController.generate);
