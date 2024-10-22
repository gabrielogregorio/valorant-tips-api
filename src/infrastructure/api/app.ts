import express from 'express';
import 'express-async-errors';
import helmet from 'helmet';
import { router } from './routes';
import { useAddTraceId } from './middlewares/useAddTraceId';
import { useCors } from './middlewares/useCors';
import { useLogger } from './middlewares/logger';
import { useSanitizeMongo } from './middlewares/useSanitizeMongo';
import { useIpRequestLimiter } from './middlewares/useIpRequestLimiter';
import { useSanitizedBody } from './middlewares/useSanitizedBody';
import { useHandleErrors } from './middlewares/useHandleErrors';

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
