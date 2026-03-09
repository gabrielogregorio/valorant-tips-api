import { z } from 'zod';
import { registry } from '../docs/registry';

registry.registerPath({
  method: 'post',
  path: '/post-tag-categories',
  description: 'Cria uma nova categoria de tags para posts',
  summary: 'Criar categoria de tags',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            name: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Categoria criada com sucesso',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/post-tag-categories',
  description: 'Lista todas as categorias de tags disponíveis',
  summary: 'Listar categorias de tags',
  responses: {
    200: {
      description: 'Lista de categorias recuperada',
    },
  },
});
