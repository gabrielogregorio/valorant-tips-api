import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors';
import { errorStates } from '../errors/types';

export const useHasFile = (req: Request, _res: Response, next: NextFunction) => {
  if (!req?.file?.path) {
    throw new AppError(errorStates.PAYLOAD_IS_INVALID, "req.file.path don't exists");
  }

  next();
};
