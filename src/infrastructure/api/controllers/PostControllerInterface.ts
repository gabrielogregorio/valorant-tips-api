import { Request, Response } from 'express';

export interface PostControllerInterface {
  createPost: (req: Request, res: Response) => Promise<Response>;
  updatePost: (req: Request, res: Response) => Promise<Response>;
  get: (req: Request, res: Response) => Promise<Response>;
  getPosts: (_req: Request, res: Response) => Promise<Response>;
  getPostsByMapAndAgent: (req: Request, res: Response) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
}
