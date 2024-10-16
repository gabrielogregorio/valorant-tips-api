import { Request, Response } from 'express';
import { statusCode } from '../config/statusCode';
import { CreateUserUseCase } from '../../../application/useCase/user/create/user';
import { UpdateUserUseCase } from '../../../application/useCase/user/update/user';
import { FindUserByIdUseCase } from '../../../application/useCase/user/findById/user';
import { DeleteUserByIdUseCase } from '../../../application/useCase/user/deleteById/user';
import { CreateUserBodyType } from '../schemas/createUser.schema';

export class UserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
    private updateUserUseCase: UpdateUserUseCase,
    private findUserByIdUseCase: FindUserByIdUseCase,
    private deleteUserByIdUseCase: DeleteUserByIdUseCase,
  ) {}

  uploadImage = async (req: Request, res: Response): Promise<Response> => {
    const filename = req.file?.filename;
    return res.json({ filename });
  };

  createUser = async (req: Request<undefined, undefined, CreateUserBodyType>, res: Response): Promise<Response> => {
    const { username, password, image, code } = req.body;

    await this.createUserUseCase.execute(code, {
      image,
      password,
      username,
    });

    return res.json({});
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { password } = req.body;
    const { username, image } = req.body;
    const { id } = req.data;

    await this.updateUserUseCase.execute(id, {
      image,
      password,
      username,
    });

    return res.json({});
  };

  get = async (req: Request, res: Response) => {
    const { id } = req.data;

    const userFounded = await this.findUserByIdUseCase.execute(id);

    return res.json(userFounded);
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.data;

    await this.deleteUserByIdUseCase.execute(id);

    return res.sendStatus(statusCode.NO_CONTENT.code);
  };
}
