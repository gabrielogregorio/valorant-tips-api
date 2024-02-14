import { Request, Response } from 'express';
import { SuggestionService } from '@/service/suggestion';
import { DataSuggestion } from '@/factories/dataSuggestion';
import { ISuggestionCreate, ISuggestionMongo, ISuggestionResponse } from '@/interfaces/suggestion';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import statusCode from '@/config/statusCode';

export class SuggestionController {
  private suggestionService: SuggestionService;

  constructor(suggestionService: SuggestionService) {
    this.suggestionService = suggestionService;
  }

  createSuggestion = async (req: Request<undefined, undefined, Omit<ISuggestionCreate, 'status'>>, res: Response) => {
    const { postId, email, description } = req.body;

    const suggestion = await this.suggestionService.create({
      postId,
      email,
      description,
      status: 'waiting',
    });

    return res.json(DataSuggestion.Build(suggestion));
  };

  getSuggestions = async (_req: Request, res: Response): Promise<Response> => {
    const suggestions: ISuggestionMongo[] = await this.suggestionService.FindAll();

    const suggestionsFactory: ISuggestionResponse[] = [];
    suggestions.forEach((suggestion) => {
      suggestionsFactory.push(DataSuggestion.Build(suggestion));
    });

    return res.json(suggestionsFactory);
  };

  // added middleware in params
  editSuggestion = async (req: Request, res: Response): Promise<Response> => {
    const suggestionId = req.params.id;
    const newStatus = req.body.status;

    const suggestionEdited = await this.suggestionService.UpdateById(suggestionId, newStatus);
    return res.json(DataSuggestion.Build(suggestionEdited));
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const suggestionId = req.params.id;

    const result = await this.suggestionService.deleteById(suggestionId);
    if (result === null) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }
    return res.sendStatus(statusCode.NO_CONTENT.code);
  };
}
