import { ObjectSchema } from 'joi';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { NextFunction, Request, Response } from 'express';

export const middlewareValidation =
  <Params, ResBody, ReqBody>(schema: ObjectSchema) =>
  (req: Request<Params, ResBody, ReqBody>, res: Response, next: NextFunction) => {
    const validate = schema.validate(req.body);
    if (validate?.error) {
      throw new AppError(errorStates.PAYLOAD_IS_INVALID, validate.error.details[0].message);
    }

    // @ts-ignore
    req.body = validate.value;
    next();
  };
