import { Request, Response } from 'express';
import { DataPost, factoryPostType } from '@/factories/dataPost';
import mongoose from 'mongoose';
import { CreatePostBodyType } from '@/schemas/createPost';
import { updatePostBodyType } from '@/schemas/updatePost';
import { PostService } from '@/service/post';
import statusCode from '../config/statusCode';

export class PostController {
  private postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  uploadFile = async (req: Request, res: Response): Promise<Response> => res.json({ filename: req!.file!.path });

  createPost = async (req: Request<undefined, undefined, CreatePostBodyType>, res: Response) => {
    const { title, description, tags, imgs } = req.body;
    const user = req.data.id as unknown as mongoose.Types.ObjectId;

    const post = await this.postService.create({ title, description, user, tags, imgs });

    return res.json(DataPost.Build(post));
  };

  updatePost = async (req: Request<undefined, undefined, updatePostBodyType>, res: Response): Promise<Response> => {
    const { title, description, tags, imgs } = req.body;
    const { id } = req.params as unknown as { id: string };
    const user = req.data.id as unknown as mongoose.Types.ObjectId;

    const post = await this.postService.updatePost({
      tags,
      title,
      description,
      imgs,
      user,
      postId: id,
    });

    return res.json(post);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const post = await this.postService.findByIdOrThrow(id);

    return res.json(post);
  };

  getMaps = async (_req: Request, res: Response<{ maps: string[] }>) => {
    const maps = await this.postService.findAvailableMaps();

    return res.json({ maps });
  };

  getAgents = async (req: Request, res: Response<{ agents: string[] }>) => {
    const agents = await this.postService.findAvailableAgents(req.params.map);

    return res.json({ agents });
  };

  getPosts = async (_req: Request, res: Response<{ posts: factoryPostType[] }>) => {
    const posts = await this.postService.FindAll();

    return res.json({ posts });
  };

  getPostsByMapAndAgent = async (req: Request, res: Response): Promise<Response> => {
    const { agent, map } = req.params as { agent: string; map: string };

    const posts = await this.postService.FindAllByMapAndAgent(agent, map);

    return res.status(statusCode.SUCCESS.code).json({ posts });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const idPost = req.params.id;
    const userId = req.data.id as string;

    await this.postService.deleteById(idPost, userId);

    return res.sendStatus(statusCode.NO_CONTENT.code);
  };
}
