import Joi from 'joi';

export type EditSuggestionBodyType = {
  status: string;
};

export const schemaEditSuggestion = Joi.object<EditSuggestionBodyType, true>().keys({
  status: Joi.string().valid('accepted', 'rejected', 'waiting').required(),
});
