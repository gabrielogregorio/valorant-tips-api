import { Router } from 'express';
import { useValidation } from '@/middlewares/useValidation';
import { schemaCode } from '@/schemas/code';
import { userAuthCodeIsCorrect } from '@/middlewares/userCodeIsCorrect';
import { AppDependencyInjector } from '../container';

const { codeController } = AppDependencyInjector;

export const codeRouter = Router();

codeRouter.post('/', userAuthCodeIsCorrect, useValidation({ body: schemaCode }), codeController.generate);
