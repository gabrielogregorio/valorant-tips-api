import { registry } from '../docs/registry';
import { schemaCreateUser } from './createUser.schema';
import { schemaUpdateUser } from './updateUser.schema';

registry.registerPath({
  method: 'post',
  path: '/users',
  description: 'Cria um novo usuário no sistema',
  summary: 'Criar usuário',
  request: {
    body: {
      content: {
        'application/json': {
          schema: schemaCreateUser.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Usuário criado com sucesso',
    },
    400: {
      description: 'Dados inválidos',
    },
  },
});

registry.registerPath({
  method: 'patch',
  path: '/users',
  description: 'Atualiza os dados do usuário autenticado',
  summary: 'Atualizar usuário',
  security: [{ bearerAuth: [] }],
  request: {
    body: {
      content: {
        'application/json': {
          schema: schemaUpdateUser.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Usuário atualizado com sucesso',
    },
    401: {
      description: 'Não autorizado',
    },
  },
});

registry.registerPath({
  method: 'get',
  path: '/users/me',
  description: 'Retorna os dados do usuário autenticado',
  summary: 'Obter perfil',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Dados do perfil recuperados',
    },
    401: {
      description: 'Não autorizado',
    },
  },
});

registry.registerPath({
  method: 'delete',
  path: '/users',
  description: 'Remove o usuário autenticado do sistema',
  summary: 'Excluir usuário',
  security: [{ bearerAuth: [] }],
  responses: {
    204: {
      description: 'Usuário removido com sucesso',
    },
    401: {
      description: 'Não autorizado',
    },
  },
});
