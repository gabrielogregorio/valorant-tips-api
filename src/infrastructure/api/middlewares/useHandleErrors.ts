import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';
import { ERROR_WITH_DEBUG } from '../config/envs';
import { Log } from '../logs';
import statusCode from '../config/statusCode';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const useHandleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    const { debug } = error;
    const context = ERROR_WITH_DEBUG ? { debug } : undefined;

    Log.warning(`AppError ${error?.error.code} - ${error?.error.name} ${debug?.trim() ? `- ${debug}` : ''} `);
    res.status(error?.error.code).json({ ...context, error: error?.name, message: error.error.message });
    return;
  }

  if (error instanceof Error) {
    Log.error(`Error ${error.name} ${error.message} ${JSON.stringify(error?.stack)}`);
    res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
    return;
  }

  Log.error(error);
  res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
};
