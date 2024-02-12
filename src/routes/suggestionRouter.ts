import { userAuth } from '@/middlewares/userAuth';
import { Router } from 'express';
import { DependencyController } from '../container';

export const suggestionRouter = Router();

const { suggestionController } = DependencyController;

suggestionRouter.post('/suggestion', suggestionController.createSuggestion);
suggestionRouter.get('/suggestions', userAuth, suggestionController.getSuggestions);
suggestionRouter.put('/suggestion/:id', userAuth, suggestionController.editSuggestion);
suggestionRouter.delete('/suggestion/:id', userAuth, suggestionController.delete);
