import { Request, Response } from 'express';
import { CodeService } from '@/service/Code';

export class CodeController {
  private codeService: CodeService;

  constructor(codeService: CodeService) {
    this.codeService = codeService;
  }

  generate = async (_req: Request, res: Response<{ token: string }>) => {
    const token = await this.codeService.create();

    return res.json({ token: token.code });
  };
}
