import { NextFunction, Request, Response } from 'express';
import crypto from 'crypto';
import { asyncLocalStorage } from '../container/globalState';

export const useAddTraceId = (req: Request, _res: Response, next: NextFunction) => {
  const traceId = req.headers['x-request-id'] || crypto.randomBytes(16).toString('hex');

  asyncLocalStorage.run(traceId, next);
};
