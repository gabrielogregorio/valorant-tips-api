import express, { Request, Response } from 'express';
import { ISuggestion } from '@/models/Suggestion';
import { SuggestionService } from '@/service/suggestion';
import { userAuth } from '@/middlewares/userAuth';
import { DataSuggestion, factorySuggestionType } from '@/factories/dataSuggestion';
import statusCode from '../config/statusCode';

const suggestionController = express.Router();

suggestionController.post('/suggestion', async (req: Request, res: Response): Promise<Response> => {
  const { post_id, email, description } = req.body;

  if (description === null || description === undefined || description === '') {
    res.statusCode = statusCode.BAD_REQUEST.code;
    return res.json({ erro: 'Parametros inválidos ou faltantes' });
  }

  const suggestion: ISuggestion = await SuggestionService.Create({
    post_id,
    email,
    description,
    status: 'accepted',
  });

  return res.json(suggestion);
});

suggestionController.get('/suggestions', userAuth, async (_req: Request, res: Response): Promise<Response> => {
  const suggestions: ISuggestion[] = await SuggestionService.FindAll();

  const suggestionsFactory: factorySuggestionType[] = [];
  suggestions.forEach((suggestion) => {
    suggestionsFactory.push(DataSuggestion.Build(suggestion));
  });

  return res.json(suggestionsFactory);
});

suggestionController.put('/suggestion/:id', userAuth, async (req: Request, res: Response): Promise<Response> => {
  const suggestionId = req.params.id;
  const newStatus = req.body.status;

  if (newStatus !== 'accepted' && newStatus !== 'rejected') {
    res.statusCode = statusCode.BAD_REQUEST.code;
    return res.json({ error: 'Status para a sugestão inválido!' });
  }

  const suggestionEdited: ISuggestion = await SuggestionService.UpdateById(suggestionId, newStatus);
  return res.json(suggestionEdited);
});

suggestionController.delete('/suggestion/:id', userAuth, async (req: Request, res: Response): Promise<Response> => {
  const suggestionId = req.params.id;

  await SuggestionService.DeleteById(suggestionId);
  return res.json({});
});

export default suggestionController;
