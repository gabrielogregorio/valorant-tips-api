import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/useCase/auth/login';

export class AuthController {
  constructor(private loginUseCase: LoginUseCase) {}

  auth = async (
    req: Request<never, never, { username: string; password: string }>,
    res: Response<{
      token: string;
      id: string;
    }>,
  ) => {
    const { username, password } = req.body;

    const response = await this.loginUseCase.execute({ username, password });

    return res.json(response);
  };
}
