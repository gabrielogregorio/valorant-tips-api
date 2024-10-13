import Joi from 'joi';
import { IImagePost, IPost } from '@/interfaces/post';

export type updatePostBodyType = {
  title?: string;
  description?: string;
  tags?: IPost['tags'];
  imgs?: IImagePost[];
};

export const schemaUpdatePosts = Joi.object<updatePostBodyType, true>().keys({
  title: Joi.string(),
  description: Joi.string(),
  tags: Joi.object({
    moment: Joi.string().required(),
    difficult: Joi.string().required(),
    ability: Joi.string().required(),
    side: Joi.string().required(),
    map: Joi.string().required(),
    mapPosition: Joi.string().required(),
    agent: Joi.string().required(),
  }),
  imgs: Joi.array().items(
    Joi.object({
      description: Joi.string().required(),
      image: Joi.string().required(),
      _id: Joi.string().required(),
    }),
  ),
});
