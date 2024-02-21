import express, { Router } from 'express';
import { baseRouter } from './base';
import { authRouter } from './authRouter';
import { docsRouter } from './docs';
import { codeRouter } from './codeRouter';
import { dashboardRouter } from './dashboardRouter';
import { postRouter } from './postRouter';
import { suggestionRouter } from './suggestionRouter';
import { userRouter } from './userRouter';
import { viewsRouter } from './viewsRouter';

export const router = Router();

router.use(express.static('public'));

router.use('/', baseRouter);
router.use('/', docsRouter);
router.use('/users', userRouter);
router.use('/posts', postRouter);
router.use('/auth', authRouter);
router.use('/suggestions', suggestionRouter);
router.use('/code', codeRouter);
router.use('/dashboards', dashboardRouter);
router.use('/views', viewsRouter);
