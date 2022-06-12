import express, { Request, Response, Router } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { IPost } from '@/models/Post';
import { DataPost, factoryPostType } from '@/factories/dataPost';
import { userAuth } from '@/middlewares/userAuth';
import { PostService } from '@/service/post';
import messages from '@/locales/index';
import { convertMegabytesToBytes } from '@/helpers/conversors';
import statusCode from '../config/statusCode';
import { RequestMiddleware } from '../interfaces/extends';

const cloudinaryV2 = cloudinary.v2;

const postController: Router = express.Router();

dotenv.config();

cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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

postController.post(
  '/postLoadFile',
  upload.single('image'),
  async (req: Request, res: Response): Promise<Response> =>
    res.json({ filename: req.file.path }),
);

postController.post('/post', userAuth, async (req: RequestMiddleware, res: Response): Promise<Response> => {
  const { title, description, tags, imgs } = req.body as IPost;
  const user = req.data.id;

  if (!title || !description) {
    res.statusCode = statusCode.BAD_REQUEST.code;
    return res.json({ error: 'Some value is invalid' });
  }

  try {
    // @ts-ignore
    const post: IPost = await PostService.Create({ title, description, user, tags, imgs });
    const newPost: factoryPostType = DataPost.Build(post);
    return res.json(newPost);
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: messages.error.in.server });
  }
});

postController.put('/post/:id', userAuth, async (req: RequestMiddleware, res: Response): Promise<Response> => {
  const { title, description, tags, imgs } = req.body as IPost;
  const { id } = req.params;
  const user = req.data.id;

  const newImgs = [];
  imgs.forEach((img) => {
    newImgs.push({
      description: img.description,
      // @ts-ignore
      _id: img.id,
      image: img.image,
    });
  });

  if (!title || !description) {
    res.statusCode = statusCode.BAD_REQUEST.code;
    return res.json({ error: 'Some value is invalid' });
  }

  try {
    const postService: IPost = await PostService.FindByIdAndUpdate(id, {
      title,
      description,
      // @ts-ignore
      user,
      tags,
      imgs: newImgs,
    });
    const postUpdate: factoryPostType = DataPost.Build(postService);
    return res.json(postUpdate);
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: messages.error.in.server });
  }
});

postController.get('/post/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const post: IPost = await PostService.FindById(id);
    const postsBuilded: factoryPostType = DataPost.Build(post);
    return res.json(postsBuilded);
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: messages.error.in.server });
  }
});

postController.get('/maps', async (_req: Request, res: Response): Promise<Response> => {
  try {
    const maps: string[] = await PostService.findAvailableMaps();
    return res.json({ maps });
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: 'Error in get listing maps' });
  }
});

postController.get('/agents/:map', async (req: Request, res: Response): Promise<Response> => {
  try {
    const agents: string[] = await PostService.findAvailableAgents(req.params.map);
    return res.json({ agents });
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: 'Error in get listing agents by map' });
  }
});

postController.get('/posts', async (_req: Request, res: Response): Promise<Response> => {
  try {
    const postService: IPost[] = await PostService.FindAll();

    const posts: factoryPostType[] = [];
    postService.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return res.json({ posts });
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: messages.error.in.server });
  }
});

postController.get('/posts/:map/:agent', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { agent, map } = req.params as { agent: string; map: string };

    const postsService: IPost[] = await PostService.FindAllByMapAndAgent(agent, map);

    const posts: factoryPostType[] = [];
    postsService.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return res.json({ posts });
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: messages.error.in.server });
  }
});

postController.delete('/post/:id', userAuth, async (req: RequestMiddleware, res: Response): Promise<Response> => {
  const idPost = req.params.id;

  try {
    await PostService.DeleteById(idPost);
    return res.json({});
  } catch (error) {
    res.statusCode = statusCode.ERROR_IN_SERVER.code;
    return res.json({ error: messages.error.in.server });
  }
});

export default postController;
