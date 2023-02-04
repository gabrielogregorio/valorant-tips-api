import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@/config/envs';
import { CustomError } from '@/errors/index';
import { ErrorEnum } from '@/errors/types';
import statusCode from '../config/statusCode';

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
    throw new CustomError(ErrorEnum.TOKEN_IS_INVALID_OR_EXPIRED, statusCode.NEED_TOKEN.code);
  }

  const bearer = authToken.split(' ');
  const auth = bearer[1];

  if (auth === undefined) {
    throw new CustomError(ErrorEnum.TOKEN_IS_INVALID_OR_EXPIRED, statusCode.NEED_TOKEN.code);
  }

  try {
    const data = jwt.verify(auth, JWT_SECRET);
    // @ts-ignore
    req.data = data;

    if (data.username === undefined) {
      throw new CustomError(ErrorEnum.TOKEN_IS_INVALID_OR_EXPIRED, statusCode.NEED_TOKEN.code);
    }
    return next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      throw new CustomError(ErrorEnum.TOKEN_IS_INVALID_OR_EXPIRED, statusCode.NEED_TOKEN.code);
    }
    throw new CustomError(ErrorEnum.TOKEN_IS_INVALID_OR_EXPIRED, statusCode.NEED_TOKEN.code);
  }
};
