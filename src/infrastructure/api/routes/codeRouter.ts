import { Router } from 'express';

import { userAuthCodeIsCorrect } from '@/infrastructure/api/middlewares/userCodeIsCorrect';
import { useValidation } from '@/infrastructure/api/middlewares/useValidation';
import { AppDependencyInjector } from '../container';
import { schemaCode } from '../schemas/code.schema';

const { codeController } = AppDependencyInjector;

export const codeRouter = Router();

codeRouter.post('/', userAuthCodeIsCorrect, useValidation({ body: schemaCode }), codeController.generate);
