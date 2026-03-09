import { z } from 'zod';
import { registry } from '../docs/registry';

registry.registerPath({
  method: 'get',
  path: '/',
  description: 'Retorna o status e a versão da API',
  summary: 'Status da API',
  responses: {
    200: {
      description: 'API está rodando',
      content: {
        'application/json': {
          schema: z.object({
            message: z.string(),
          }),
        },
      },
    },
  },
});
