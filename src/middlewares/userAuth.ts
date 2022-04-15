import { NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

const { JWT_SECRET } = process.env;

export const userAuth = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization;

  if (authToken === '' || authToken === undefined) {
    return res.sendStatus(403);
  }

  const bearer = authToken.split(' ');
  const auth = bearer[1];

  if (auth === undefined) {
    return res.sendStatus(403);
  }

  try {
    const data = jwt.verify(auth, JWT_SECRET);
    // @ts-ignore
    req.data = data;

    if (data.username === undefined) {
      return res.sendStatus(403);
    }
    return next();
  } catch (error) {
    if (error.message === 'jwt expired') {
      res.statusCode = 403;
      return res.json({ msg: 'jwt expired' });
    }
    return res.sendStatus(403);
  }
};
