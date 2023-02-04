import statusCode from '@/config/statusCode';
import { Log } from '@/logs/index';
import { NextFunction, Request, Response } from 'express';

export const handleErrors = (err, req: Request, res: Response, next: NextFunction) => {
  Log.error(`Erro interno ${err} ${err?.stack}`);

  res.status(statusCode.ERROR_IN_SERVER.code).send('Internal Error');

  next();
};
