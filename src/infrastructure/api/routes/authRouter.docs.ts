import { registry } from '../docs/registry';
import { schemaAuth } from './makeAuth.schema';

registry.registerPath({
  method: 'post',
  path: '/auth',
  description: 'Autentica um usuário e retorna um token JWT',
  summary: 'Autenticação de usuário',
  request: {
    body: {
      content: {
        'application/json': {
          schema: schemaAuth.shape.body,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Autenticação realizada com sucesso',
    },
    401: {
      description: 'Credenciais inválidas',
    },
  },
});
