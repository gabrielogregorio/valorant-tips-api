import express from 'express';
import { useHandleErrors } from '@/middlewares/useHandleErrors';
import { useSanitizedBody } from '@/middlewares/useSanitizedBody';
import helmet from 'helmet';
import { useSanitizeMongo } from '@/middlewares/useSanitizeMongo';
import { useIpRequestLimiter } from '@/middlewares/useIpRequestLimiter';
import { useCors } from '@/middlewares/useCors';
import { useAddTraceId } from '@/middlewares/useAddTraceId';
import { useLogger } from '@/middlewares/logger';
import { router } from './routes';

const app = express();
app.disable('x-powered-by');

app.use(useAddTraceId);
app.use(useCors());
app.use(useLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());
app.use(useSanitizeMongo);
app.use(useIpRequestLimiter);
app.use(useSanitizedBody);

app.use(router);

app.use(useHandleErrors);

export { app };
