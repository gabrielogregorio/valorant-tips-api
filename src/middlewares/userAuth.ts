import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/config/envs';

import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';

export const isAuthenticate = (authorization) => {
  try {
    const data = jwt.verify(authorization, JWT_SECRET);

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

  const bearer = authToken.split(' ');
  const auth = bearer[1];

  if (auth === undefined) {
    throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED);
  }

  try {
    const data = jwt.verify(auth, JWT_SECRET);
    // @ts-ignore
    req.data = data;

    if (data.username === undefined) {
      throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED);
    }
    return next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED);
    }
    throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED);
  }
};
