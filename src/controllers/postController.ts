import { Request, Response } from 'express';
import { IPost } from '@/models/Post';
import { DataPost, factoryPostType } from '@/factories/dataPost';
import { PostService } from '@/service/post';
import statusCode from '../config/statusCode';
import { RequestMiddleware } from '../interfaces/extends';

export class PostController {
  postService: PostService;

  constructor(postService: PostService) {
    this.postService = postService;
  }

  async uploadFile(req: Request, res: Response): Promise<Response> {
    return res.json({ filename: req.file.path });
  }

  async createPost(req: RequestMiddleware, res: Response) {
    const { title, description, tags, imgs } = req.body as IPost;
    const user = req.data.id;

    if (!title || !description) {
      res.statusCode = statusCode.BAD_REQUEST.code;
      return res.json({ error: 'Some value is invalid' });
    }

    // @ts-ignore
    const post: IPost = await PostService.Create({ title, description, user, tags, imgs });
    const newPost: factoryPostType = DataPost.Build(post);
    return res.json(newPost);
  }

  async updatePost(req: RequestMiddleware, res: Response): Promise<Response> {
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

    const postService: IPost = await this.postService.FindByIdAndUpdate(id, {
      title,
      description,
      // @ts-ignore
      user,
      tags,
      imgs: newImgs,
    });
    const postUpdate: factoryPostType = DataPost.Build(postService);
    return res.json(postUpdate);
  }

  async get(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const post: IPost = await this.postService.FindById(id);
    const postsBuilded: factoryPostType = DataPost.Build(post);
    return res.json(postsBuilded);
  }

  async getMaps(_req: Request, res: Response): Promise<Response> {
    const maps: string[] = await this.postService.findAvailableMaps();
    return res.json({ maps });
  }

  async getAgents(req: Request, res: Response): Promise<Response> {
    const agents: string[] = await this.postService.findAvailableAgents(req.params.map);
    return res.json({ agents });
  }

  async getPosts(_req: Request, res: Response): Promise<Response> {
    const postService: IPost[] = await this.postService.FindAll();

    const posts: factoryPostType[] = [];
    postService.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return res.json({ posts });
  }

  async getPostsByMapAndAgent(req: Request, res: Response): Promise<Response> {
    const { agent, map } = req.params as { agent: string; map: string };

    const postsService: IPost[] = await this.postService.FindAllByMapAndAgent(agent, map);

    const posts: factoryPostType[] = [];
    postsService.forEach((post) => {
      posts.push(DataPost.Build(post));
    });

    return res.status(statusCode.SUCCESS.code).json({ posts });
  }

  async delete(req: RequestMiddleware, res: Response): Promise<Response> {
    const idPost = req.params.id;

    await this.postService.DeleteById(idPost);

    return res.status(statusCode.NO_CONTENT.code).send();
  }
}
