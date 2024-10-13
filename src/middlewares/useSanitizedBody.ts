import sanitizeHtml from 'sanitize-html';
import mongoSanitize from 'express-mongo-sanitize';
import { NextFunction, Request, Response } from 'express';

export const useSanitizedBody = (req: Request, res: Response, next: NextFunction) => {
  if (req.body === undefined || req.body === null) {
    next();
    return;
  }
  const sanitizedHtmlBody = Object.keys(req.body).reduce((acc: any, key) => {
    const value = req.body?.[key];

    acc[key] = typeof value === 'string' ? sanitizeHtml(value) : value;
    return acc;
  }, {});

  const sanitizedMongoBody = mongoSanitize.sanitize(sanitizedHtmlBody);

  req.body = sanitizedMongoBody;

  next();
};
