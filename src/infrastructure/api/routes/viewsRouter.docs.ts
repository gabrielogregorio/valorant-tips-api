import { z } from 'zod';
import { registry } from '../docs/registry';

registry.registerPath({
  method: 'post',
  path: '/views',
  description: 'Registra uma nova visualização para um post',
  summary: 'Registrar visualização',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({
            postId: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Visualização registrada com sucesso',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/views',
  description: 'Retorna estatísticas de visualizações',
  summary: 'Obter visualizações',
  responses: {
    200: {
      description: 'Dados de visualizações recuperados',
    },
  },
});
