import { Request, Response } from 'express';
import { ISuggestion } from '@/models/Suggestion';
import { SuggestionService } from '@/service/suggestion';
import { DataSuggestion, factorySuggestionType } from '@/factories/dataSuggestion';
import statusCode from '../config/statusCode';

export class SuggestionController {
  suggestionService: SuggestionService;

  constructor(suggestionService: SuggestionService) {
    this.suggestionService = suggestionService;
  }

  async createSuggestion(req: Request, res: Response) {
    const { post_id, email, description } = req.body;

    if (description === null || description === undefined || description === '') {
      res.statusCode = statusCode.BAD_REQUEST.code;
      return res.json({ erro: 'Parametros inválidos ou faltantes' });
    }

    const suggestion: ISuggestion = await this.suggestionService.Create({
      post_id,
      email,
      description,
      status: 'accepted',
    });

    return res.json(suggestion);
  }

  async getSuggestions(_req: Request, res: Response): Promise<Response> {
    const suggestions: ISuggestion[] = await this.suggestionService.FindAll();

    const suggestionsFactory: factorySuggestionType[] = [];
    suggestions.forEach((suggestion) => {
      suggestionsFactory.push(DataSuggestion.Build(suggestion));
    });

    return res.json(suggestionsFactory);
  }

  async editSuggestion(req: Request, res: Response): Promise<Response> {
    const suggestionId = req.params.id;
    const newStatus = req.body.status;

    if (newStatus !== 'accepted' && newStatus !== 'rejected') {
      res.statusCode = statusCode.BAD_REQUEST.code;
      return res.json({ error: 'Status para a sugestão inválido!' });
    }

    const suggestionEdited: ISuggestion = await this.suggestionService.UpdateById(suggestionId, newStatus);
    return res.json(suggestionEdited);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const suggestionId = req.params.id;

    await this.suggestionService.DeleteById(suggestionId);
    return res.json({});
  }
}
