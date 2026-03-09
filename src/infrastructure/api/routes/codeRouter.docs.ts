import { registry } from '../docs/registry';
import { schemaCode } from './code.schema';

registry.registerPath({
  method: 'post',
  path: '/codes',
  description: 'Gera um novo código de segurança para registro de usuário',
  summary: 'Gerar código de segurança',
  request: {
    body: {
      content: {
        'application/json': {
          schema: schemaCode.shape.body,
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Código gerado com sucesso',
    },
  },
});
