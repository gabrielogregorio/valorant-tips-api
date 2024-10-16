import { Request, Response } from 'express';

import { statusCode } from '../config/statusCode';
import { CreatePostUseCase } from '../../../application/useCase/post/create/create';
import { UpdatePostUseCase } from '../../../application/useCase/post/update/upate';
import { FindAvailableMapsUseCase } from '../../../application/useCase/post/findAvailableMaps/post';
import { FindAllByMapAndAgentUseCase } from '../../../application/useCase/post/findAllByMapAndAgent/post';
import { DeletePostUseCase } from '../../../application/useCase/post/deleteById/delete';
import { FindAllPostUseCase } from '../../../application/useCase/post/findAll/post';
import { FindAvailableAgentsUseCase } from '../../../application/useCase/post/findAvailableAgents/post';
import { FindPostByIdOrThrowUseCase } from '../../../application/useCase/post/findByIdOrThrow';
import { CreatePostBodyType } from '../schemas/createPost.schema';
import { updatePostBodyType } from '../schemas/updatePost.schema';

export class PostController {
  constructor(
    private createPostUseCase: CreatePostUseCase,
    private updatePostUseCase: UpdatePostUseCase,
    private findPostByIdOrThrowUseCase: FindPostByIdOrThrowUseCase,
    private findAvailableMapsUseCase: FindAvailableMapsUseCase,
    private findAvailableAgentsUseCase: FindAvailableAgentsUseCase,
    private findAllPostUseCase: FindAllPostUseCase,
    private findAllByMapAndAgentUseCase: FindAllByMapAndAgentUseCase,
    private deletePostUseCase: DeletePostUseCase,
  ) {}

  uploadFile = async (req: Request, res: Response): Promise<Response> => res.json({ filename: req!.file!.path });

  createPost = async (req: Request<undefined, undefined, CreatePostBodyType>, res: Response) => {
    const { title, description, tags, imgs } = req.body;
    const userId = req.data.id as string;

    const post = await this.createPostUseCase.execute({ title, description, userId, tags, imgs });

    return res.json({
      id: post.id,
      title: post.title,
      description: post.description,
      tags: post.tags,
      user: {
        username: post.user.username,
        image: post.user.image,
      },
      imgs: post.imgs,
    });
  };

  updatePost = async (req: Request<undefined, undefined, updatePostBodyType>, res: Response): Promise<Response> => {
    const { title, description, tags, imgs } = req.body;
    const { id } = req.params as unknown as { id: string };
    const userId = req.data.id as string;

    const post = await this.updatePostUseCase.execute(id, {
      tags,
      title,
      description,
      imgs,
      userId,
    });

    return res.json(post);
  };

  get = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    const post = await this.findPostByIdOrThrowUseCase.execute(id);

    return res.json(post);
  };

  getMaps = async (_req: Request, res: Response<{ maps: string[] }>) => {
    const maps = await this.findAvailableMapsUseCase.execute();

    return res.json({ maps });
  };

  getAgents = async (req: Request, res: Response<{ agents: string[] }>) => {
    const agents = await this.findAvailableAgentsUseCase.execute(req.params.map);

    return res.json({ agents });
  };

  getPosts = async (_req: Request, res: Response) => {
    const posts = await this.findAllPostUseCase.execute();

    return res.json({
      posts: posts.map((item) => ({
        id: item.id,
        description: item.description,
        imgs: item.imgs,
        tags: item.tags,
        title: item.title,
        user: item.user,
      })),
    });
  };

  getPostsByMapAndAgent = async (req: Request, res: Response) => {
    const { agent, map } = req.params as { agent: string; map: string };

    const posts = await this.findAllByMapAndAgentUseCase.execute({ agent, map });

    return res.status(statusCode.SUCCESS.code).json({
      posts: posts.map((item) => ({
        id: item.id,
        description: item.description,
        imgs: item.imgs,
        tags: item.tags,
        title: item.title,
        user: item.user,
      })),
    });
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const idPost = req.params.id;
    const userId = req.data.id as string;

    await this.deletePostUseCase.execute(idPost, userId);

    return res.sendStatus(statusCode.NO_CONTENT.code);
  };
}
