import express, { Request, Response } from 'express';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { IPost } from '@/models/Post';
import { DataPost } from '@/factories/dataPost';
import { userAuth } from '@/middlewares/userAuth';
import { PostService } from '@/service/post';

const router = express.Router();

dotenv.config();

// @ts-ignore
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  // @ts-ignore
  cloudinary,
  params: {
    // @ts-ignore
    folder: 'tips',
  },
});

const upload = multer({ storage });

function validValues(value) {
  if (value === '' || value === undefined || value === null) {
    return null;
  }
  return value;
}

router.post(
  '/postLoadFile',
  upload.single('image'),
  async (req: Request, res: Response): Promise<Response> =>
    // @ts-ignore
    res.json({ filename: req.file.path }),
);

router.post('/post', userAuth, async (req: Request, res: Response): Promise<Response> => {
  const { title, description, tags, imgs } = req.body;
  // @ts-ignore
  const user = req.data.id;

  if (validValues(title) === null || validValues(description) === null) {
    res.statusCode = 400;
    return res.json({ error: 'Algum valor inválido' });
  }

  try {
    const newPost = DataPost.Build(await PostService.Create({ title, description, user, tags, imgs }));
    return res.json(newPost);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

router.put('/post/:id', userAuth, async (req: Request, res: Response): Promise<Response> => {
  const { title, description, tags, imgs } = req.body;
  const { id } = req.params;
  // @ts-ignore
  const user = req.data.id;

  const newImgs = [];
  imgs.forEach((img) => {
    newImgs.push({
      description: img.description,
      _id: img.id,
      image: img.image,
    });
  });

  if (validValues(title) === null || validValues(description) === null) {
    res.statusCode = 400;
    return res.json({ error: 'Algum valor inválido' });
  }

  try {
    const postUpdate = DataPost.Build(
      await PostService.FindByIdAndUpdate(id, { title, description, user, tags, imgs: newImgs }),
    );
    return res.json(postUpdate);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

router.get('/post/:id', async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params;

  try {
    const post: IPost = await PostService.FindById(id);
    const postsBuilded = DataPost.Build(post);
    return res.json(postsBuilded);
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

router.get('/maps', async (req: Request, res: Response): Promise<Response> => {
  try {
    const maps = await PostService.findAvaliableMaps();
    return res.json({ maps });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro ao obter a listagem de mapas' });
  }
});

router.get('/agents/:map', async (req: Request, res: Response): Promise<Response> => {
  try {
    const agents = await PostService.findAvaliableAgents(req.params.map);
    return res.json({ agents });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro ao obter a listagem de Agentes por mapa' });
  }
});

router.get('/posts', async (req: Request, res: Response): Promise<Response> => {
  try {
    const posts = await PostService.FindAll();

    const postsFactories = [];
    posts.forEach((post) => {
      postsFactories.push(DataPost.Build(post));
    });

    return res.json({ posts: postsFactories });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

router.get('/posts/:map/:agent', async (req: Request, res: Response): Promise<Response> => {
  try {
    const { agent, map } = req.params;

    const posts = await PostService.FindAllByMapAndAgent(agent, map);

    const postsFactories = [];
    posts.forEach((post) => {
      postsFactories.push(DataPost.Build(post));
    });

    return res.json({ posts: postsFactories });
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

router.delete('/post/:id', userAuth, async (req: Request, res: Response): Promise<Response> => {
  // @ts-ignore
  const idUser = req.data.id;
  const idPost = req.params.id;

  try {
    // @ts-ignore
    await PostService.DeleteById(idPost, idUser);
    return res.json({});
  } catch (error) {
    res.statusCode = 500;
    return res.json({ error: 'Erro no servidor' });
  }
});

export default router;
