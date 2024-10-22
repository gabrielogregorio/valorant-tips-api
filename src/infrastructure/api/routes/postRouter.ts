import express, { Router } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/api/config/envs';
import { userAuth } from '@/api/middlewares/userAuth';
import { useValidation } from '@/api/middlewares/useValidation';
import { useHasFile } from '@/api/middlewares/useHasFile';
import { convertMegabytesToBytes } from '@/api/helpers/conversors';
import { AppDependencyInjector } from '../container';
import { schemaUpdatePosts } from '../schemas/updatePost.schema';
import { schemaCreatePost } from '../schemas/createPost.schema';

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    folder: 'tips',
  } as any,
});

const LIMIT_SIZE_UPLOAD_IN_BYTES = convertMegabytesToBytes(10);
const upload = multer({
  // @ts-ignore
  storage,
  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
  },
});

export const postRouter: Router = express.Router();

const { postController } = AppDependencyInjector;

// @ts-ignore
postRouter.post('/load-file', useHasFile, upload.single('image'), postController.uploadFile);
postRouter.post('/', userAuth, useValidation({ body: schemaCreatePost }), postController.createPost as any);
postRouter.put('/:id', userAuth, useValidation({ body: schemaUpdatePosts }), postController.updatePost as any);
postRouter.get('/maps', postController.getMaps);
postRouter.get('/:id', userAuth, postController.get);
postRouter.get('/agents/:map', postController.getAgents);
postRouter.get('/', postController.getPosts);
postRouter.get('/:map/:agent', postController.getPostsByMapAndAgent);
postRouter.delete('/:id', userAuth, postController.delete);
