import { Request, Response } from 'express';
import { CreateCodeUseCase } from '../../../application/useCase/code/create';

export class CodeController {
  constructor(private createCodeUseCase: CreateCodeUseCase) {}

  generate = async (_req: Request, res: Response<{ token: string }>) => {
    const token = await this.createCodeUseCase.execute();

    return res.json({ token: token.code });
  };
}
