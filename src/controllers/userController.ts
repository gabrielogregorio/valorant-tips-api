/* eslint-disable no-underscore-dangle */
import express, { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { IUser } from '@/models/User';
import { UserService } from '@/service/user';
import { CodeService } from '@/service/Code';
import { userAuth } from '@/middlewares/userAuth';
import { DataUser } from '@/factories/dataUser';
import { multerUser } from '@/middlewares/multerUser';
import { ICode } from '@/models/Code';
import messages from '@/locales/index';

const userController: Router = express.Router();
const jwtSecret: string = process.env.JWT_SECRET;

dotenv.config();
userController.post(
  '/userLoadFile',
  multerUser.single('image'),
  async (req: Request, res: Response): Promise<Response> => {
    let filename: string = '';

    // @ts-ignore
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // @ts-ignore
    if (req.file) {
      filename = req.file.filename;
    }
    return res.json({ filename });
  },
);

userController.post('/auth', async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body as { username: string; password: string };

  const user: IUser = await UserService.FindByUsername(username);

  if (!user) {
    return res.sendStatus(404);
  }

  const valid: boolean = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.sendStatus(403);
  }

  // @ts-ignore
  return jwt.sign({ username, name: user.name, id: user._id }, jwtSecret, { expiresIn: '128h' }, (error, token) => {
    if (error) {
      return res.sendStatus(500);
    }
    // @ts-ignore
    return res.json({ token, id: user._id });
  });
});

userController.post('/user', async (req: Request, res: Response): Promise<Response> => {
  const { username, password, image, code } = req.body as {
    username: string;
    password: string;
    image: string;
    code: string;
  };

  const codeData: ICode = await CodeService.FindCode(code);

  if (codeData?.code?.length < 10 || codeData === null) {
    res.statusCode = 403;
    return res.json({ msg: 'invalid code' });
  }

  if (!username || !password) {
    return res.sendStatus(400);
  }

  const userExists = await UserService.UserExistsByUsername(username, '');

  if (userExists !== undefined) {
    res.statusCode = 409;
    return res.json({ error: 'Username is already registered' });
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const update = { username, password: hash };
  if (image !== undefined && image !== '') {
    // @ts-ignore
    update.image = image;
  }

  try {
    const use = await CodeService.UseCode(codeData.code);
    if (use.available !== false) {
      return res.sendStatus(403);
    }

    // @ts-ignore
    const newUser = DataUser.Build(await UserService.Create(update));
    return res.json(newUser);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: messages.error.in.server });
  }
});

userController.put('/user', userAuth, async (req: Request, res: Response): Promise<Response> => {
  let { password } = req.body;
  const { username, image } = req.body;
  // @ts-ignore
  const { id } = req.data;

  const usernameIsAlreadyRegistered = username !== '' && username !== undefined && username !== null;
  if (usernameIsAlreadyRegistered) {
    const userExists: IUser = await UserService.UserExistsByUsername(username, id);

    if (userExists !== undefined) {
      res.statusCode = 409;
      return res.json({ error: 'Username is already registered' });
    }
  }

  if (password !== '' && password !== undefined && password !== null) {
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt); // Hash
  } else {
    password = undefined;
  }

  const update: IUser = { username, password, image: image ?? undefined };

  try {
    const user: IUser = await UserService.FindByIdAndUpdate(id, update);
    const userBuilded = DataUser.Build(user);
    return res.json(userBuilded);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: messages.error.in.server });
  }
});

userController.get('/user', userAuth, async (req: Request, res: Response): Promise<Response> => {
  // @ts-ignore
  const { id } = req.data;

  try {
    const user: IUser = await UserService.FindById(id);
    const userBuilded = DataUser.Build(user);
    return res.json(userBuilded);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: messages.error.in.server });
  }
});

userController.delete('/user', userAuth, async (req: Request, res: Response): Promise<Response> => {
  // @ts-ignore
  const { id } = req.data;

  try {
    await UserService.DeleteById(id);
    return res.json({});
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: messages.error.in.server });
  }
});

export default userController;
