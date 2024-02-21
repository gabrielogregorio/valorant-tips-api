import { userAuth } from '@/middlewares/userAuth';
import { Router } from 'express';
import { middlewareValidation } from '@/middlewares/validator';
import { schemaCreateSuggestion } from '@/schemas/createSuggestions';
import { schemaEditSuggestion } from '@/schemas/updateSuggestion';
import { DependencyController } from '../container';

export const suggestionRouter = Router();

const { suggestionController } = DependencyController;

suggestionRouter.post('/', middlewareValidation(schemaCreateSuggestion), suggestionController.createSuggestion);
suggestionRouter.get('/', userAuth, suggestionController.getSuggestions);
suggestionRouter.put('/:id', userAuth, middlewareValidation(schemaEditSuggestion), suggestionController.editSuggestion);
suggestionRouter.delete('/:id', userAuth, suggestionController.delete);
