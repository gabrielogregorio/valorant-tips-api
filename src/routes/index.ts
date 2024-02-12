import { Router } from 'express';
import { postRouter } from 'src/routes/postRouter';
import { userRouter } from 'src/routes/userRouter';

export const router = Router();

router.use('/', userRouter);
router.use('/', postRouter);
