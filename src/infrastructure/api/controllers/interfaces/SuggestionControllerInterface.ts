import { Request, Response } from 'express';
import { ICreateSuggestion, IResponseSuggestion } from '../../interfaces/suggestion';

export interface SuggestionControllerInterface {
  createSuggestion: (
    req: Request<undefined, undefined, Omit<ICreateSuggestion, 'status'>>,
    res: Response<IResponseSuggestion>,
  ) => Promise<Response>;
  getSuggestions: (_req: Request, res: Response<IResponseSuggestion[]>) => Promise<Response>;
  editSuggestion: (req: Request, res: Response<IResponseSuggestion>) => Promise<Response>;
  delete: (req: Request, res: Response) => Promise<Response>;
}
