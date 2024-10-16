import { NextFunction, Request, Response } from 'express';
import { SECURITY_CODE } from '../config/envs';
import { errorStates } from '../errors/types';
import { AppError } from '../errors';

export const userAuthCodeIsCorrect = (req: Request, res: Response, next: NextFunction) => {
  const { securityCode } = req.body;

  if (securityCode !== SECURITY_CODE) {
    throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED, 'Token is different from security code');
  }

  next();
};
