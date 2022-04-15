/* eslint-disable no-underscore-dangle */
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { IUser } from '@/models/User';
import { UserService } from '@/service/user';
import { CodeService } from '@/service/Code';
import { userAuth } from '@/middlewares/userAuth';
import { DataUser } from '@/factories/dataUser';
import { multerUser } from '@/middlewares/multerUser';

const router = express.Router();
const jwtSecret = process.env.JWT_SECRET;

dotenv.config();
router.post('/userLoadFile', multerUser.single('image'), async (req: Request, res: Response): Promise<Response> => {
  let filename = '';

  // @ts-ignore
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // @ts-ignore
  if (req.file) {
    // @ts-ignore
    filename = req.file.filename;
  } else {
    filename = '';
  }
  return res.json({ filename });
});

router.post('/auth', async (req: Request, res: Response): Promise<Response> => {
  const { username, password } = req.body;

  const user = await UserService.FindByUsername(username);

  if (user === undefined) {
    return res.sendStatus(404);
  }

  // @ts-ignore
  const valid = await bcrypt.compare(password, user.password);
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

router.post('/user', async (req: Request, res: Response): Promise<Response> => {
  const { username, password, image, code } = req.body;

  const codeData = await CodeService.FindCode(code);

  if (codeData?.code?.length < 10 || codeData === null) {
    res.statusCode = 403;
    return res.json({ msg: 'invalid code' });
  }

  if (
    username === undefined ||
    username === null ||
    username === '' ||
    password === undefined ||
    password === null ||
    password === ''
  ) {
    return res.sendStatus(400);
  }

  // Verifica se o username já está registrado
  const userExists = await UserService.UserExistsByUsername(username, '');
  if (userExists !== undefined) {
    res.statusCode = 409;
    return res.json({ error: 'Username já está cadastrado!' });
  }

  // Gera um hash da senha
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
    return res.json({ error: 'Erro no servidor' });
  }
});

router.put('/user', userAuth, async (req: Request, res: Response): Promise<Response> => {
  let { password } = req.body;
  const { username, image } = req.body;
  // @ts-ignore
  const { id } = req.data;

  // Se o Usuário foi alterado, verificar se já existe no db
  if (username !== '' && username !== undefined && username !== null) {
    const userExists: IUser = await UserService.UserExistsByUsername(username, id);

    if (userExists !== undefined) {
      res.statusCode = 409;
      return res.json({ error: 'Username já está cadastrado!' });
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
    return res.json({ error: 'Erro no servidor' });
  }
});

router.get('/user', userAuth, async (req: Request, res: Response): Promise<Response> => {
  // @ts-ignore
  const { id } = req.data;

  try {
    const user: IUser = await UserService.FindById(id);
    const userBuilded = DataUser.Build(user);
    return res.json(userBuilded);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

router.delete('/user', userAuth, async (req: Request, res: Response): Promise<Response> => {
  // @ts-ignore
  const { id } = req.data;

  try {
    await UserService.DeleteById(id);
    return res.json({});
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

export default router;
