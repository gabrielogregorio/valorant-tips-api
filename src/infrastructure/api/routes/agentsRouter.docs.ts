import { z } from 'zod';
import { registry } from '../docs/registry';

registry.registerPath({
  method: 'post',
  path: '/agents',
  description: 'Cria um novo agente com uma imagem',
  summary: 'Criar agente',
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            name: z.string(),
            image: z.string().describe('File upload'),
          }),
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Agente criado com sucesso',
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/agents/{id}',
  description: 'Atualiza os dados de um agente',
  summary: 'Atualizar agente',
  request: {
    params: z.object({ id: z.string() }),
    body: {
      content: {
        'multipart/form-data': {
          schema: z.object({
            name: z.string().optional(),
            image: z.string().describe('File upload').optional(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Agente atualizado com sucesso',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/agents',
  description: 'Lista todos os agentes cadastrados',
  summary: 'Listar agentes',
  responses: {
    200: {
      description: 'Lista de agentes recuperada',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/agents/{mapId}/posts',
  description: 'Retorna agentes que possuem posts em um mapa específico',
  summary: 'Listar agentes por mapa',
  request: {
    params: z.object({ mapId: z.string() }),
  },
  responses: {
    200: {
      description: 'Lista de agentes recuperada',
    },
  },
});
