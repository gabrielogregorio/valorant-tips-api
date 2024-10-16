import Joi from 'joi';
import { ICreateSuggestion } from '../interfaces/suggestion';

type typeSchema = Omit<ICreateSuggestion, 'status'>;

export const schemaCreateSuggestion = Joi.object<typeSchema, true>().keys({
  postId: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string().required(),
});
