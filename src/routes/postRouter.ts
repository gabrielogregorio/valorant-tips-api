import express, { Router } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from 'cloudinary';
import { userAuth } from '@/middlewares/userAuth';
import { convertMegabytesToBytes } from '@/helpers/conversors';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_CLOUD_NAME } from '@/config/envs';
import { DependencyController } from 'src/container';

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

const { PostController } = DependencyController;

postRouter.post('/postLoadFile', upload.single('image'), PostController.uploadFile);
postRouter.post('/post', userAuth, PostController.createPost);
postRouter.put('/post/:id', userAuth, PostController.updatePost);
postRouter.get('/post/:id', userAuth, PostController.get);
postRouter.get('/maps', PostController.getMaps);
postRouter.get('/agents/:map', PostController.getAgents);
postRouter.get('/posts', PostController.getPosts);
postRouter.get('/posts/:map/:agent', PostController.getPostsByMapAndAgent);
postRouter.delete('/post/:id', userAuth, PostController.delete);
