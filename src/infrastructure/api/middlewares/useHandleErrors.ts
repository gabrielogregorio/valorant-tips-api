import { NextFunction, Request, Response } from 'express';

import { Log } from '../logs';
import { statusCode } from '../config/statusCode';
import { ApiError } from '../errors/ApiError';
import { AppError } from '../../../application/errors/AppError';

function getLocationError(error: Error): string {
  try {
    const stackLines = error?.stack?.split?.('\n') || [];
    return stackLines[1]?.trim() || '';
  } catch (err) {
    console.log('Error not has stack lines', err);
    return '';
  }
}

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const useHandleErrors = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof ApiError) {
    const { context } = error;

    Log.warning(
      `ApiError ${error?.error.code} - ${error?.error.name} ${context?.trim() ? `- ${context}` : ''} | ${getLocationError(error)}`,
    );
    res.status(error?.error.code).json({ message: error.error.message });
    return;
  }

  if (error instanceof AppError) {
    Log.warning(`AppError ${error?.code} | ${getLocationError(error)}`);
    res.status(409).json({ error: error.code });
    return;
  }

  if (error instanceof Error) {
    Log.error(`Error ${error.name} ${error.message} | ${getLocationError(error)}`);
    Log.error(error?.stack);
    res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
    return;
  }

  Log.error('Internal Unknown Server Error', error);
  res.status(statusCode.ERROR_IN_SERVER.code).json({ message: 'Internal Error' });
};
