import express, { Router } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { userAuth } from '@/middlewares/userAuth';
import { convertMegabytesToBytes } from '@/helpers/conversors';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/config/envs';
import { middlewareValidation } from '@/middlewares/validator';
import { schemaCreatePost } from '@/schemas/createPost';
import { schemaUpdatePosts } from '@/schemas/updatePost';
import { DependencyController } from '../container';

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: {
    // @ts-ignore
    folder: 'tips',
  },
});

const LIMIT_SIZE_UPLOAD_IN_BYTES = convertMegabytesToBytes(10);
const upload = multer({
  storage,
  limits: {
    fileSize: LIMIT_SIZE_UPLOAD_IN_BYTES,
  },
});

export const postRouter: Router = express.Router();

const { postController } = DependencyController;

postRouter.post('/postLoadFile', upload.single('image'), postController.uploadFile);
postRouter.post('/post', userAuth, middlewareValidation(schemaCreatePost), postController.createPost as any);
postRouter.put('/post/:id', userAuth, middlewareValidation(schemaUpdatePosts), postController.updatePost as any);
postRouter.get('/post/:id', userAuth, postController.get);
postRouter.get('/maps', postController.getMaps);
postRouter.get('/agents/:map', postController.getAgents);
postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:map/:agent', postController.getPostsByMapAndAgent);
postRouter.delete('/post/:id', userAuth, postController.delete);
