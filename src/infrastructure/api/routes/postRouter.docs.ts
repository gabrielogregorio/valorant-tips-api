import { z } from 'zod';
import { registry } from '../docs/registry';
import { schemaCreatePost } from './createPost.schema';
import { schemaUpdatePosts } from './updatePost.schema';

registry.registerPath({
  method: 'post',
  path: '/posts',
  description: 'Cria uma nova dica (post) no sistema',
  summary: 'Criar post',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'multipart/form-data': {
          schema: schemaCreatePost.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Post criado com sucesso',
    },
  },
});

registry.registerPath({
  method: 'put',
  path: '/posts/{id}',
  description: 'Atualiza um post existente',
  summary: 'Atualizar post',
  security: [{ bearerAuth: [] }],
  request: {
    params: schemaUpdatePosts.shape.params,
    body: {
      content: {
        'multipart/form-data': {
          schema: schemaUpdatePosts.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Post atualizado com sucesso',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/posts',
  description: 'Lista todos os posts disponíveis',
  summary: 'Listar posts',
  responses: {
    200: {
      description: 'Lista de posts recuperada',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/posts/{id}',
  description: 'Retorna os detalhes de um post específico',
  summary: 'Obter post',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    200: {
      description: 'Dados do post recuperados',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/posts/{map}/{agent}',
  description: 'Retorna posts filtrados por mapa e agente',
  summary: 'Listar posts por mapa e agente',
  request: {
    params: z.object({
      map: z.string(),
      agent: z.string(),
    }),
  },
  responses: {
    200: {
      description: 'Posts filtrados recuperados',
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/posts/{id}',
  description: 'Remove um post do sistema',
  summary: 'Excluir post',
  security: [{ bearerAuth: [] }],
  request: {
    params: z.object({ id: z.string() }),
  },
  responses: {
    204: {
      description: 'Post removido com sucesso',
    },
  },
});
