import { z } from '@/infrastructure/api/docs/zod-extensions';

export const mapSchema = z.object({
  id: z.string().openapi({ example: '33a3ae241fe2df449e8bc1cf' }),
  name: z.string().openapi({ example: 'Ascent' }),
  imageUrl: z.string().openapi({ example: 'http://127.0.0.1:3333/maps/Ascent.webp' }),
});

export const mapListSchema = z.array(mapSchema);
