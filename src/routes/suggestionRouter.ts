import { userAuth } from '@/middlewares/userAuth';
import { Router } from 'express';
import { DependencyController } from 'src/container';

export const suggestionRouter = Router();

const { SuggestionController } = DependencyController;

suggestionRouter.post('/suggestion', SuggestionController.createSuggestion);
suggestionRouter.get('/suggestions', userAuth, SuggestionController.getSuggestions);
suggestionRouter.put('/suggestion/:id', userAuth, SuggestionController.editSuggestion);
suggestionRouter.delete('/suggestion/:id', userAuth, SuggestionController.delete);
