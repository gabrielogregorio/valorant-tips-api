import { ISuggestionCreate } from '@/interfaces/suggestion';
import Joi from 'joi';

type typeSchema = Omit<ISuggestionCreate, 'status'>;

export const schemaCreateSuggestion = Joi.object<typeSchema, true>().keys({
  postId: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string().required(),
});
