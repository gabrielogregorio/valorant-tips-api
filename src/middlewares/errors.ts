import statusCode from '@/config/statusCode';
import { AppError } from '@/errors/index';
import { Log } from '@/logs/index';
import { NextFunction, Request, Response } from 'express';

export const handleErrors = (error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    Log.error(`Erro ${error?.statusCode} - ${error?.name}`);
    res.status(error?.statusCode).send({ NAME: error?.name });
  } else {
    Log.error(`Erro interno ${error} ${error?.stack}`);
    res.status(statusCode.ERROR_IN_SERVER.code).send('Internal Error');
  }

  next();
};
