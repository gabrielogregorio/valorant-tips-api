import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '@/service/user';
import { DataUser } from '@/factories/dataUser';
import { JWT_SECRET } from '@/config/envs';
import { AppError } from '@/errors/index';
import { CodeService } from '@/service/Code';
import { errorStates } from '@/errors/types';
import { CreateUserBodyType } from '@/schemas/createUser';
import { IUser } from '@/interfaces/user';
import statusCode from '../config/statusCode';

const jwtSecret: string = JWT_SECRET;

export class UserController {
  private codeService: CodeService;

  private userService: UserService;

  constructor(codeService: CodeService, userService: UserService) {
    this.codeService = codeService;
    this.userService = userService;
  }

  uploadImage = async (req: Request, res: Response): Promise<Response> => {
    let filename = '';

    if (!req.file) {
      return res.status(statusCode.BAD_REQUEST.code).send('No file uploaded.');
    }

    if (req.file) {
      filename = req.file.filename;
    }
    return res.json({ filename });
  };

  auth = async (req: Request, res: Response) => {
    const { username, password } = req.body as { username: string; password: string };

    const user = await this.userService.findOneByUsername(username);

    if (!user) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }

    const valid: boolean = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new AppError(errorStates.PASSWORD_IS_INVALID, 'encrypt is invalid');
    }

    jwt.sign({ username, name: user.username, id: user._id }, jwtSecret, { expiresIn: '128h' }, (error, token) => {
      if (error) {
        throw new AppError(errorStates.INTERNAL_ERROR, JSON.stringify(error));
      }

      return res.json({ token, id: user._id });
    });
  };

  createUser = async (req: Request<undefined, undefined, CreateUserBodyType>, res: Response): Promise<Response> => {
    const { username, password, image, code } = req.body;

    const codeData = await this.codeService.findCode(code);

    if (codeData === null) {
      throw new AppError(errorStates.TOKEN_IS_INVALID_OR_EXPIRED);
    }

    const userExists = await this.userService.findOneByUsername(username);
    if (userExists) {
      throw new AppError(errorStates.CONFLICT_ALREADY_EXISTS, 'username already exists');
    }

    const hash = await this.userService.createPasswordHash(password);
    const update: IUser = { username, password: hash };
    if (image !== undefined && image !== '') {
      update.image = image;
    }

    const use = await this.codeService.useCode(codeData.code);
    if (use?.available !== false) {
      return res.sendStatus(statusCode.NEED_TOKEN.code);
    }

    const newUser = DataUser.Build(await this.userService.create(update));
    return res.json(newUser);
  };

  updateUser = async (req: Request, res: Response): Promise<Response> => {
    const { password } = req.body;
    const { username, image } = req.body;
    const { id } = req.data;

    const userUpdated = await this.userService.updateUser({ id, username, image, password });

    return res.json(userUpdated);
  };

  get = async (req: Request, res: Response) => {
    const { id } = req.data;

    const user = await this.userService.findById(id);
    const userBuilded = DataUser.Build(user);
    return res.json(userBuilded);
  };

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.data;

    const user = await this.userService.deleteById(id);
    if (!user) {
      throw new AppError(errorStates.RESOURCE_NOT_EXISTS);
    }
    return res.sendStatus(statusCode.NO_CONTENT.code);
  };
}
