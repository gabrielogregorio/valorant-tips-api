import { Request, Response } from 'express';
import { DataPost, factoryPostType } from '@/factories/dataPost';
import { PostService } from '@/service/post';
import { IImagePost, IPost } from '@/interfaces/post';
import { AppError } from '@/errors/index';
import { ObjectId } from 'mongoose';
import { errorStates } from '@/errors/types';
import statusCode from '../config/statusCode';
import { RequestMiddleware } from '../interfaces/extends';

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

  createPost = async (req: RequestMiddleware, res: Response) => {
    const { title, description, tags, imgs } = req.body as IPost;
    const user = req.data.id as unknown as ObjectId;

    if (!title || !description) {
      res.statusCode = statusCode.BAD_REQUEST.code;
      return res.json({ error: 'Some value is invalid' });
    }

    const post: IPost = await this.postService.create({ title, description, user, tags, imgs });
    const newPost: factoryPostType = DataPost.Build(post);
    return res.json(newPost);
  };

  updatePost = async (req: RequestMiddleware, res: Response): Promise<Response> => {
    const { title, description, tags, imgs } = req.body as IPost;
    const { id } = req.params;
    const user = req.data.id as unknown as ObjectId;

    const newImgs: IImagePost[] = [];
    imgs.forEach((img) => {
      newImgs.push({
        description: img.description,
        _id: img._id,
        image: img.image,
      });
    });

    if (!title || !description) {
      res.statusCode = statusCode.BAD_REQUEST.code;
      return res.json({ error: 'Some value is invalid' });
    }

    const postService: IPost = await this.postService.findByIdAndUpdate(id, {
      title,
      description,
      user,
      tags,
      imgs: newImgs,
    });
    const postUpdate: factoryPostType = DataPost.Build(postService);
    return res.json(postUpdate);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const post: IPost = await this.postService.findById(id);
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

  delete = async (req: RequestMiddleware, res: Response): Promise<Response> => {
    const idPost = req.params.id;

    await this.postService.DeleteById(idPost);

    return res.status(statusCode.NO_CONTENT.code).send();
  };
}
