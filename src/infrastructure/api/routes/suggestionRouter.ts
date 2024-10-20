import { userAuth } from '@/api/middlewares/userAuth';
import { Router } from 'express';
import { useValidation } from '@/api/middlewares/useValidation';
import { AppDependencyInjector } from '../container';
import { schemaCreateSuggestion } from '../schemas/createSuggestions.schema';
import { schemaEditSuggestion } from '../schemas/updateSuggestion.schema';

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
