import express, { Request, Response } from 'express';
import cors from 'cors';
// import path from 'path';
// import docbytest from 'docbytest';
import { handleErrors } from '@/middlewares/errors';
// import statusCode from '@/config/statusCode';
import { middlewareSanitizedBody } from '@/middlewares/sanetize';
import helmet from 'helmet';
import { useSanetizeMongo } from '@/middlewares/useSanetizeMongo';
import { useLimiter } from '@/middlewares/useLimiter';
import { router } from './routes';

// const docbytestTest = docbytest(statusCode);

const app = express();
app.use(helmet());
app.use(useSanetizeMongo);
app.use(useLimiter);

app.disable('x-powered-by');

const corsOptions = {
  origin: ['https://valorant-tips.vercel.app/'],
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));
app.use(express.static('public'));

app.use(middlewareSanitizedBody);
app.use(router);

app.use(express.static('public'));
// app.get('/docs-json', async (_req, res) => {
//   const docs = await docbytestTest;
//   return res.json(docs);
// });

app.get('/', (_req: Request, res: Response): Response => res.send('api is running'));

// app.use('/docs/', express.static(path.join(__dirname, '../node_modules/docbytest-ui/build/')));

app.use(handleErrors);

export { app };
