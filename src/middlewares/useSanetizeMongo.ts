import { Log } from '@/logs/index';
import mongoSanitize from 'express-mongo-sanitize';
import { Request } from 'express';

export const useSanetizeMongo = mongoSanitize({
  onSanitize: ({ req, key }) => {
    const sanitizedContent = JSON.stringify(req?.[key as keyof Request]);
    Log.warning(`${req.method} ${req.url} from ${req.ip} had [${key}] sanitized ${sanitizedContent}`);
  },
});
