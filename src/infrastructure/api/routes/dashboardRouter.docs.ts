import { registry } from '../docs/registry';

registry.registerPath({
  method: 'get',
  path: '/dashboard',
  description: 'Retorna dados resumidos para o painel de controle',
  summary: 'Obter dados do dashboard',
  security: [{ bearerAuth: [] }],
  responses: {
    200: {
      description: 'Dados do dashboard recuperados',
    },
    401: {
      description: 'Não autorizado',
    },
  },
});
