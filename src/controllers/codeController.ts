import { Request, Response } from 'express';
import { CodeService } from '@/service/Code';
import { GENERATOR_CODE as GENERATOR_CODE_ENV } from '@/config/envs';
import statusCode from '../config/statusCode';

let tryCreateCode: number = 0;

export class CodeController {
  private codeService: CodeService;

  constructor(codeService: CodeService) {
    this.codeService = codeService;
  }

  generate = async (req: Request, res: Response) => {
    const { GENERATOR_CODE } = req.body;
    tryCreateCode += 1;
    if (tryCreateCode === 5) {
      res.sendStatus(statusCode.NOT_ALLOWED.code);
      return;
    }

    if (!GENERATOR_CODE) {
      res.sendStatus(statusCode.NEED_TOKEN.code);
      return;
    }

    if (GENERATOR_CODE === GENERATOR_CODE_ENV && GENERATOR_CODE.length > 15) {
      const codeGenerated = await this.codeService.create();
      res.json({ code: codeGenerated.code });
      return;
    }

    res.sendStatus(statusCode.NOT_ALLOWED.code);
  };
}
