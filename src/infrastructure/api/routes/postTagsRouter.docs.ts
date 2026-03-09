import { z } from 'zod';
import { registry } from '../docs/registry';

registry.registerPath({
  method: 'post',
  path: '/post-tags',
  description: 'Cria uma nova tag associada a uma categoria',
  summary: 'Criar tag',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string(),
            categoryId: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Tag criada com sucesso',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/post-tags',
  description: 'Lista todas as tags de posts disponíveis',
  summary: 'Listar tags',
  responses: {
    200: {
      description: 'Lista de tags recuperada',
    },
  },
});
