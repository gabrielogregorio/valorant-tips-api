import statusCode from '@/config/statusCode';
import { AppError } from '@/errors/index';
import { Log } from '@/logs/index';
import { NextFunction, Request, Response } from 'express';
import 'express-async-errors';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const handleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    Log.warning(`AppError ${error?.statusCode} - ${error?.name}`);
    res.status(error?.statusCode).send({ NAME: error?.name });
    return;
  }

  if (error instanceof Error) {
    Log.error(`Error ${error.name} ${error.message} ${JSON.stringify(error?.stack)}`);
    res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
    return;
  }

  Log.error(`Unknown Error ${error}`);
  res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
};
