import { z } from 'zod';
import { registry } from '../docs/registry';
import { schemaCreateSuggestion } from './createSuggestions.schema';
import { schemaEditSuggestion } from './updateSuggestion.schema';

registry.registerPath({
  method: 'post',
  path: '/suggestions',
  description: 'Cria uma nova sugestão para um post',
  summary: 'Criar sugestão',
  request: {
    body: {
      content: {
        'application/json': {
          schema: schemaCreateSuggestion.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Sugestão criada com sucesso',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/suggestions',
  description: 'Lista todas as sugestões enviadas',
  summary: 'Listar sugestões',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Lista de sugestões recuperada',
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/suggestions/{id}',
  description: 'Edita o status de uma sugestão',
  summary: 'Editar sugestão',
  security: [{ bearerAuth: [] }],
  request: {
    params: schemaEditSuggestion.shape.params,
    body: {
      content: {
        'application/json': {
          schema: schemaEditSuggestion.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Sugestão atualizada com sucesso',
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/suggestions/{id}',
  description: 'Remove uma sugestão do sistema',
  summary: 'Excluir sugestão',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    204: {
      description: 'Sugestão removida com sucesso',
    },
  },
});
