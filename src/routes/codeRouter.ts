import { Router } from 'express';
import { DependencyController } from '../container';

const { codeController } = DependencyController;

export const codeRouter = Router();

codeRouter.post('/generate_code', codeController.generate);
