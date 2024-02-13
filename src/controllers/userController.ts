import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { UserService } from '@/service/user';
import { DataUser } from '@/factories/dataUser';
import { JWT_SECRET } from '@/config/envs';
import { AppError } from '@/errors/index';
import { CodeService } from '@/service/Code';
import { IUser } from '@/interfaces/user';
import { ICode } from '@/interfaces/code';
import { errorStates } from '@/errors/types';
import statusCode from '../config/statusCode';
import { RequestMiddleware, RequestMulter } from '../interfaces/extends';

const jwtSecret: string = JWT_SECRET;

export class UserController {
  private codeService: CodeService;

  private userService: UserService;

  constructor(codeService: CodeService, userService: UserService) {
    this.codeService = codeService;
    this.userService = userService;
  }

  uploadImage = async (req: RequestMulter, res: Response): Promise<Response> => {
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

    const user: IUser = await this.userService.findByUsername(username);

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

  createUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password, image, code } = req.body as {
      username: string;
      password: string;
      image: string;
      code: string;
    };

    const codeData: ICode = await this.codeService.findCode(code);

    if (codeData?.code?.length < 10 || codeData === null) {
      res.statusCode = statusCode.NEED_TOKEN.code;
      return res.json({ msg: 'invalid code' });
    }

    if (!username || !password) {
      return res.sendStatus(statusCode.BAD_REQUEST.code);
    }

    const userExists = await this.userService.userExistsByUsername(username, '');

    if (userExists !== undefined) {
      res.statusCode = statusCode.CONFLICT.code;
      return res.json({ error: 'Username is already registered' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const update = { username, password: hash };
    if (image !== undefined && image !== '') {
      // @ts-ignore
      update.image = image;
    }

    const use = await this.codeService.useCode(codeData.code);
    if (use.available !== false) {
      return res.sendStatus(statusCode.NEED_TOKEN.code);
    }

    // @ts-ignore
    const newUser = DataUser.Build(await this.userService.Create(update));
    return res.json(newUser);
  };

  updateUser = async (req: RequestMiddleware, res: Response): Promise<Response> => {
    let { password } = req.body;
    const { username, image } = req.body;
    const { id } = req.data;

    const usernameIsAlreadyRegistered = username !== '' && username !== undefined && username !== null;
    if (usernameIsAlreadyRegistered) {
      const userExists: IUser = await this.userService.userExistsByUsername(username, id);

      if (userExists !== undefined) {
        res.statusCode = statusCode.CONFLICT.code;
        return res.json({ error: 'Username is already registered' });
      }
    }

    if (password !== '' && password !== undefined && password !== null) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    } else {
      password = undefined;
    }

    const update: IUser = { username, password, image: image ?? undefined };

    const user = await this.userService.findByIdAndUpdate(id, update);
    const userBuilded = DataUser.Build(user);
    return res.json(userBuilded);
  };

  get = async (req: RequestMiddleware, res: Response) => {
    const { id } = req.data;

    const user: IUser = await this.userService.findById(id);
    const userBuilded = DataUser.Build(user);
    return res.json(userBuilded);
  };

  delete = async (req: RequestMiddleware, res: Response): Promise<Response> => {
    const { id } = req.data;

    await this.userService.deleteById(id);
    return res.json({});
  };
}
