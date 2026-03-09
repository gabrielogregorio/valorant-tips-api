import { Request, Response } from 'express';

export interface MapsControllerInterface {
  create: (req: Request, res: Response) => Promise<Response>;
  update: (req: Request, res: Response) => Promise<Response>;
  getAll: (_req: Request, res: Response) => Promise<Response>;
}
