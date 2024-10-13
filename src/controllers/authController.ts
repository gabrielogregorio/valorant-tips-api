import { Request, Response } from 'express';
import { AuthService } from '@/service/auth';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  auth = async (
    req: Request<never, never, { username: string; password: string }>,
    res: Response<{
      token: string;
      id: string;
    }>,
  ) => {
    const { username, password } = req.body;

    const response = await this.authService.auth({ username, password });

    return res.json(response);
  };
}
