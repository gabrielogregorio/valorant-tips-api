import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/config/envs';

import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';

export const isAuthenticate = (authorization: string) => {
  try {
    const data = jwt.verify(authorization, JWT_SECRET) as any;

    if (data.username === undefined) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
};

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;
  if (authToken === '' || authToken === undefined) {
    throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED);
  }

  try {
    const data = jwt.verify(authToken, JWT_SECRET) as any;
    // @ts-ignore
    req.data = data;

    if (data.username === undefined) {
      throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED, 'no username');
    }
    return next();
  } catch (error: any) {
    if (error.message === 'jwt expired') {
      throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED, 'jwt expirated');
    }
    throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED, 'unknow error');
  }
};
