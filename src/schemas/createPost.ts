import { IImagePost, IPost } from '@/interfaces/post';
import Joi from 'joi';

export type CreatePostBodyType = {
  title: string;
  description: string;
  tags: IPost['tags'];
  imgs: IImagePost[];
};

export const schemaCreatePost = Joi.object<CreatePostBodyType, true>().keys({
  title: Joi.string().required(),
  description: Joi.string().required(),
  tags: Joi.object({
    moment: Joi.string().required(),
    difficult: Joi.string().required(),
    ability: Joi.string().required(),
    side: Joi.string().required(),
    map: Joi.string().required(),
    mapPosition: Joi.string().required(),
    agent: Joi.string().required(),
  }).required(),
  imgs: Joi.array()
    .items(
      Joi.object({
        description: Joi.string().required(),
        image: Joi.string().required(),
        _id: Joi.string().required(),
      }),
    )
    .required(),
});
