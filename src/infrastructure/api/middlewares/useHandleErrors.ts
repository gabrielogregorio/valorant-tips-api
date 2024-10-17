import { NextFunction, Request, Response } from 'express';

import { ERROR_WITH_DEBUG } from '../config/envs';
import { Log } from '../logs';
import { statusCode } from '../config/statusCode';
import { ApiError } from '../errors/ApiError';
import { AppError } from '../../../application/errors/AppError';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const useHandleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    const { debug } = error;
    const context = ERROR_WITH_DEBUG ? { debug } : undefined;

    Log.warning(`ApiError ${error?.error.code} - ${error?.error.name} ${debug?.trim() ? `- ${debug}` : ''} `);
    res.status(error?.error.code).json({ ...context, error: error?.name, message: error.error.message });
    return;
  }

  if (error instanceof AppError) {
    Log.warning(`AppError ${error?.code}`);
    res.status(409).json({ error: error.code });
    return;
  }

  if (error instanceof Error) {
    Log.error(`Error ${error.name} ${error.message}`);
    Log.error(error?.stack);
    res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
    return;
  }

  Log.error(error);
  res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
};
