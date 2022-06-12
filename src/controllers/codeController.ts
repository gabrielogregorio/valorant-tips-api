import express, { Request, Response, Router } from 'express';
import dotenv from 'dotenv';
import { CodeService } from '@/service/Code';
import { ICode } from '@/models/Code';
import statusCode from '../config/statusCode';

dotenv.config();

const codeController: Router = express.Router();

let tryCreateCode: number = 0;

codeController.post('/generate_code', async (req: Request, res: Response): Promise<Response> => {
  const { GENERATOR_CODE } = req.body as { GENERATOR_CODE: string };

  if (tryCreateCode === 2) {
    return res.sendStatus(statusCode.NOT_ALLOWED.code);
  }

  if (GENERATOR_CODE === process.env.GENERATOR_CODE && GENERATOR_CODE.length > 15) {
    const codeGenerated: ICode = await CodeService.Create();
    return res.json({ code: codeGenerated.code });
  }
  tryCreateCode += 1;
  return res.sendStatus(statusCode.NOT_FOUND.code);
});

export default codeController;
