import { Request, Response } from 'express';
import { CodeService } from '@/service/Code';
import { SECURITY_CODE } from '@/config/envs';
import { AppError } from '@/errors/index';
import { errorStates } from '@/errors/types';
import { CodeBodyType } from '@/schemas/code';

export class CodeController {
  private codeService: CodeService;

  constructor(codeService: CodeService) {
    this.codeService = codeService;
  }

  generate = async (req: Request<undefined, undefined, CodeBodyType>, res: Response<{ token: string }>) => {
    const { securityCode } = req.body;

    if (securityCode !== SECURITY_CODE) {
      throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED, 'Token is different from security code');
    }

    const token = await this.codeService.create();

    res.json({ token: token.code });
  };
}
