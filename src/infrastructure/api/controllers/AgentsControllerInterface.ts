import { Request, Response } from 'express';

export interface AgentsControllerInterface {
  create: (req: Request, res: Response) => Promise<Response>;
  update: (req: Request, res: Response) => Promise<Response>;
  getAll: (_req: Request, res: Response) => Promise<Response>;
  findAvailableAgentsByMaps:  (_req: Request, res: Response) => Promise<Response>;


}
