import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { ISuggestion } from '@/models/Sugestion';
import { SuggestionService } from '@/service/suggestion';
import { userAuth } from '@/middlewares/userAuth';
import { DataSuggestion } from '@/factories/dataSuggestion';

dotenv.config();

const router = express.Router();

router.post('/suggestion', async (req: Request, res: Response): Promise<Response> => {
  // eslint-disable-next-line camelcase
  const { post_id, email, description } = req.body;

  if (description === null || description === undefined || description === '') {
    res.statusCode = 400;
    return res.json({ erro: 'Parametros inválidos ou faltantes' });
  }

  try {
    const suggestion: ISuggestion = await SuggestionService.Create({
      post_id,
      email,
      description,
      status: 'accepted',
    });

    return res.json(suggestion);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no Servidor' });
  }
});

router.get('/suggestions', userAuth, async (req: Request, res: Response): Promise<Response> => {
  try {
    const suggestions: ISuggestion[] = await SuggestionService.FindAll();

    const suggestionsFactory = [];
    suggestions.forEach((suggestion) => {
      suggestionsFactory.push(DataSuggestion.Build(suggestion));
    });

    return res.json(suggestionsFactory);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no Servidor' });
  }
});

router.put('/suggestion/:id', userAuth, async (req: Request, res: Response): Promise<Response> => {
  const suggestionId = req.params.id;
  const newStatus = req.body.status;

  if (newStatus !== 'accepted' && newStatus !== 'rejected') {
    res.statusCode = 400;
    return res.json({ error: 'Status para a sugestão inválido!' });
  }

  try {
    const suggestionEdited: ISuggestion = await SuggestionService.UpdateById(suggestionId, newStatus);
    return res.json(suggestionEdited);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: 'Erro no Servidor' });
  }
});

router.delete('/suggestion/:id', userAuth, async (req: Request, res: Response): Promise<Response> => {
  const suggestionId = req.params.id;

  try {
    await SuggestionService.DeleteById(suggestionId);
    return res.json({});
  } catch (error) {
    res.statusCode = 500;
    return res.json({ msg: 'Erro no Servidor' });
  }
});

export default router;
