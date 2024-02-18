import Joi from 'joi';

export type AuthBodyType = {
  username: string;
  password: string;
};

export const schemaAuth = Joi.object<AuthBodyType, true>().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
});
