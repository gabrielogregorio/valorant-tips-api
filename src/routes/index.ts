import { Router } from 'express';
import { codeRouter } from 'src/routes/codeRouter';
import { dashboardRouter } from 'src/routes/dashboardRouter';
import { postRouter } from 'src/routes/postRouter';
import { suggestionRouter } from 'src/routes/suggestionRouter';
import { userRouter } from 'src/routes/userRouter';
import { viewsRouter } from 'src/routes/viewsRouter';

export const router = Router();

router.use('/', userRouter);
router.use('/', postRouter);
router.use('/', suggestionRouter);
router.use('/', codeRouter);
router.use('/', dashboardRouter);
router.use('/', viewsRouter);
