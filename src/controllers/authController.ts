import { Request, Response } from 'express';
import { AuthService } from '@/service/auth';

export class AuthController {
  private authService: AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }

  auth = async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };
    const response = await this.authService.auth({ username, password });
    return res.json(response);
  };
}
