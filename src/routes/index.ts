import { Router } from 'express';
import { codeRouter } from './codeRouter';
import { dashboardRouter } from './dashboardRouter';
import { postRouter } from './postRouter';
import { suggestionRouter } from './suggestionRouter';
import { userRouter } from './userRouter';
import { viewsRouter } from './viewsRouter';

export const router = Router();

router.use('/', userRouter);
router.use('/', postRouter);
router.use('/', suggestionRouter);
router.use('/', codeRouter);
router.use('/', dashboardRouter);
router.use('/', viewsRouter);
