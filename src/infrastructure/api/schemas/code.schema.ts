import Joi from 'joi';

export type CodeBodyType = {
  securityCode: string;
};

export const schemaCode = Joi.object<CodeBodyType, true>().keys({
  securityCode: Joi.string().required(),
});
