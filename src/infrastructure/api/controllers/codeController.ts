import { Request, Response } from 'express';
import { CreateCodeUseCaseInterface } from '../../../application/useCase/code/create/CreateCodeUseCaseInterface';

export class CodeController {
  constructor(private createCodeUseCase: CreateCodeUseCaseInterface) {}

  generate = async (_req: Request, res: Response<{ token: string }>) => {
    const token = await this.createCodeUseCase.execute();

    return res.json({ token: token.code });
  };
}
