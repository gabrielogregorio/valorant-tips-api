import { Router } from 'express';
import { useValidation } from '@/middlewares/useValidation';
import { userAuthCodeIsCorrect } from '@/middlewares/userCodeIsCorrect';
import { AppDependencyInjector } from '../container';
import { schemaCode } from '../schemas/code.schema';

const { codeController } = AppDependencyInjector;

export const codeRouter = Router();

codeRouter.post('/', userAuthCodeIsCorrect, useValidation({ body: schemaCode }), codeController.generate);
