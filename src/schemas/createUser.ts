import Joi from 'joi';

export type CreateUserBodyType = {
  username: string;
  password: string;
  code: string;
  image?: string;
};

export const schemaCreateUser = Joi.object<CreateUserBodyType, true>().keys({
  username: Joi.string().required(),
  password: Joi.string().required(),
  code: Joi.string().required(),
  image: Joi.string().optional(),
});
