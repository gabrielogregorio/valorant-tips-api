import { Router } from 'express';
import { userRouter } from 'src/routes/userRouter';

export const router = Router();

router.use('/', userRouter);
