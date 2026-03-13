import { Request, Response } from 'express';
import { LoginUseCaseInterface } from '@/application/contexts/auth/useCases/login/LoginUseCaseInterface';
import { AuthControllerInterface } from './AuthControllerInterface';
import { useValidation } from '../middlewares/useValidation';
import { schemaAuth } from '../routes/makeAuth.schema';

export class AuthController implements AuthControllerInterface {
  constructor(private _loginUseCase: LoginUseCaseInterface) {}

  auth = async (req: Request, res: Response) => {
    const content = useValidation(req, schemaAuth);

    const { username, password } = content.body;

    const response = await this._loginUseCase.execute({ username, password });

    return res.json(response);
  };
}
