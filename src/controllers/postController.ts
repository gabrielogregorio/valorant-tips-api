import { Request, Response } from 'express';
import { DataPost, factoryPostType } from '@/factories/dataPost';
import { PostService } from '@/service/post';
import { IImagePost, IPost } from '@/interfaces/post';
import { AppError } from '@/errors/index';
import mongoose from 'mongoose';
import { errorStates } from '@/errors/types';
import { CreatePostBodyType } from '@/schemas/createPost';
import { updatePostBodyType } from '@/schemas/updatePost';
import statusCode from '../config/statusCode';

export class PostController {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  uploadFile = async (req: Request, res: Response): Promise<Response> => {
    if (!req?.file?.path) {
      throw new AppError(errorStates.PAYLOAD_IS_INVALID, "req.file.path don't exists");
    }

    return res.json({ filename: req.file.path });
  };

  createPost = async (req: Request<undefined, undefined, CreatePostBodyType>, res: Response) => {
    const { title, description, tags, imgs } = req.body;
    const user = req.data.id as unknown as mongoose.Types.ObjectId;

    if (!title || !description) {
      res.statusCode = statusCode.BAD_REQUEST.code;
      return res.json({ error: 'Some value is invalid' });
    }

    const post: IPost = await this.postService.create({ title, description, user, tags, imgs });
    const newPost: factoryPostType = DataPost.Build(post);
    return res.json(newPost);
  };

  updatePost = async (req: Request<undefined, undefined, updatePostBodyType>, res: Response): Promise<Response> => {
    const { title, description, tags, imgs } = req.body;
    const { id } = req.params as unknown as { id: string };
    const user = req.data.id as unknown as mongoose.Types.ObjectId;

    const newImgs: IImagePost[] = [];
    imgs?.forEach((img) => {
      newImgs.push({
        description: img.description,
        _id: img._id,
        image: img.image,
      });
    });

    const updatePayload = {
      ...(title !== undefined ? { title } : {}),
      ...(description !== undefined ? { description } : {}),
      user,
      ...(tags !== undefined ? { tags } : {}),
      ...(imgs !== undefined ? { imgs: newImgs } : {}),
    };

    const postService: IPost = await this.postService.findByIdAndUpdate(id, {
      ...updatePayload,
    });
    const postUpdate: factoryPostType = DataPost.Build(postService);
    return res.json(postUpdate);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const post = await this.postService.findByIdOrThrow(id);
    const postsBuilded: factoryPostType = DataPost.Build(post);
    return res.json(postsBuilded);
  };

  getMaps = async (_req: Request, res: Response): Promise<Response> => {
    const maps: string[] = await this.postService.findAvailableMaps();
    return res.json({ maps });
  };

  getAgents = async (req: Request, res: Response): Promise<Response> => {
    const agents: string[] = await this.postService.findAvailableAgents(req.params.map);
    return res.json({ agents });
  };

  getPosts = async (_req: Request, res: Response): Promise<Response> => {
    const postService: IPost[] = await this.postService.FindAll();
    const posts: factoryPostType[] = [];
    postService.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return res.json({ posts });
  };

  getPostsByMapAndAgent = async (req: Request, res: Response): Promise<Response> => {
    const { agent, map } = req.params as { agent: string; map: string };

    const postsService: IPost[] = await this.postService.FindAllByMapAndAgent(agent, map);

    const posts: factoryPostType[] = [];
    postsService.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return res.status(statusCode.SUCCESS.code).json({ posts });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const idPost = req.params.id;
    const userId = req.data.id as string;

    const postDeleted = await this.postService.deleteById(idPost, userId);

    if (postDeleted === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    return res.sendStatus(statusCode.NO_CONTENT.code);
  };
}
