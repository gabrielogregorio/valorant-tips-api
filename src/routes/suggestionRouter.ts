import { userAuth } from '@/middlewares/userAuth';
import { Router } from 'express';
import { useValidation } from '@/middlewares/useValidation';
import { schemaCreateSuggestion } from '@/schemas/createSuggestions';
import { schemaEditSuggestion } from '@/schemas/updateSuggestion';
import { AppDependencyInjector } from '../container';

export const suggestionRouter = Router();

const { suggestionController } = AppDependencyInjector;

suggestionRouter.post('/', useValidation({ body: schemaCreateSuggestion }), suggestionController.createSuggestion);
suggestionRouter.get('/', userAuth, suggestionController.getSuggestions);
suggestionRouter.put(
  '/:id',
  userAuth,
  useValidation({ body: schemaEditSuggestion }),
  suggestionController.editSuggestion,
);
suggestionRouter.delete('/:id', userAuth, suggestionController.delete);
