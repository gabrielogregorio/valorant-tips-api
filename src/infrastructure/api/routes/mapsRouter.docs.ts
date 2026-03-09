import { registry } from '../docs/registry';
import { mapListSchema } from '../../contexts/maps/validator/schema';

registry.registerPath({
  method: 'get',
  path: '/maps',
  description: 'Retorna a lista de todos os mapas disponíveis',
  summary: 'Listar mapas',
  responses: {
    200: {
      description: 'Lista de mapas recuperada com sucesso',
      content: {
        'application/json': {
          schema: mapListSchema,
        },
      },
    },
  },
});
