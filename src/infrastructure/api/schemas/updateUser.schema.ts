import Joi from 'joi';

export type updateUserBodyType = {
  password?: string;
  username?: string;
  image?: string;
};

export const schemaUpdateUser = Joi.object<updateUserBodyType, true>().keys({
  password: Joi.string().optional(),
  username: Joi.string().optional(),
  image: Joi.string().optional(),
});
