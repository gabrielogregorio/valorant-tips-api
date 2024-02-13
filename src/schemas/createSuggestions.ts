import Joi from 'joi';

export type CreateSuggestionBodyType = {
  post_id: string;
  email: string;
  description: string;
};

export const schemaCreateSuggestion = Joi.object<CreateSuggestionBodyType, true>().keys({
  post_id: Joi.string().required(),
  email: Joi.string().required(),
  description: Joi.string().required(),
});
