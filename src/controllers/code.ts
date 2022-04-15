import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { CodeService } from '@/service/Code';

dotenv.config();

const router = express.Router();

let tryCreateCode = 0;

router.post('/generate_code', async (req: Request, res: Response): Promise<Response> => {
  const { GENERATOR_CODE } = req.body;

  if (tryCreateCode === 2) {
    return res.sendStatus(405);
  }

  if (GENERATOR_CODE === process.env.GENERATOR_CODE && GENERATOR_CODE.length > 15) {
    const codeGenerated = await CodeService.Create();
    return res.json({ code: codeGenerated.code });
  }
  tryCreateCode += 1;
  return res.sendStatus(404);
});

export default router;
