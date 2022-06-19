import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import statusCode from '../config/statusCode';

dotenv.config();

const { JWT_SECRET } = process.env;

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
    return res.sendStatus(statusCode.NEED_TOKEN.code);
  }

  const bearer = authToken.split(' ');
  const auth = bearer[1];

  if (auth === undefined) {
    return res.sendStatus(statusCode.NEED_TOKEN.code);
  }

  try {
    const data = jwt.verify(auth, JWT_SECRET);
    // @ts-ignore
    req.data = data;

    if (data.username === undefined) {
      return res.sendStatus(statusCode.NEED_TOKEN.code);
    }
    return next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      res.statusCode = statusCode.NEED_TOKEN.code;
      return res.json({ msg: 'jwt expired' });
    }
    return res.sendStatus(statusCode.NEED_TOKEN.code);
  }
};
