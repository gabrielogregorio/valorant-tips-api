import { Router } from 'express';
import { DependencyController } from 'src/container';

const { CodeController } = DependencyController;

export const codeRouter = Router();

codeRouter.post('/generate_code', CodeController.generate);
