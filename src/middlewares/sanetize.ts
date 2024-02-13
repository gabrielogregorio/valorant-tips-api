import sanitizeHtml from 'sanitize-html';
import mongoSanitize from 'express-mongo-sanitize';
import { NextFunction, Request, Response } from 'express';

export const middlewareSanitizedBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.body === undefined || req.body === null) {
    next();
    return;
  }
  const sanitizedHtmlBody = Object.keys(req.body).reduce((acc, key) => {
    // @ts-ignore
    const value = req.body?.[key];
    // @ts-ignore
    acc[key] = typeof value === 'string' ? sanitizeHtml(value) : value;
    return acc;
  }, {});

  const sanitizedMongoBody = mongoSanitize.sanitize(sanitizedHtmlBody);

  // @ts-ignore
  req.body = sanitizedMongoBody;

  next();
};
