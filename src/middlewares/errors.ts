import statusCode from '@/config/statusCode';
import { CustomError } from '@/errors/index';
import { Log } from '@/logs/index';
import { NextFunction, Request, Response } from 'express';

export const handleErrors = (err, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    Log.error(`Erro ${err.statusCode} - ${err.name}`);
    return res.status(err.statusCode).send({ NAME: err.name });
  }

  Log.error(`Erro interno ${err} ${err?.stack}`);
  res.status(statusCode.ERROR_IN_SERVER.code).send('Internal Error');

  return next();
};
