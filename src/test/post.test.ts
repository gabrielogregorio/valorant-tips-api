import supertest from 'supertest';
import mockTests from '@/mock/mockTests.json';
import { connection } from './mockMongoose';
import { app } from '../app';

const request = supertest(app);
let codeGenerate = '';
let idUser = '';
let token = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5c' };
let postId = '213';

const post = {
  title: 'Titulo de um post maluco',
  description: 'Descrição maluca',
  user: '',
  tags: {
    moment: 'ComeçoPartida',
    difficult: 'hard',
    ability: 'Spot',
    side: 'Atacantes',
    map: 'Ascent',
    mapPosition: 'heaven',
    agent: 'Sova',
  },
  imgs: [
    {
      id: '1',
      description: 'Primeiro mire no pontinho roxo indicado',
      img: 'img/pontinho.png',
    },
    {
      id: '2',
      description: 'Depois solte a flexa com 1.5 de força',
      img: 'img/pontinho2.png',
    },
  ],
};

const postEdited = {
  title: 'Titulo de um post maluco Editado',
  description: 'Descrição maluca 2',
  user: '',
  tags: {
    moment: 'ComeçoPartida',
    difficult: 'Facil',
    ability: 'Spot',
    side: 'Atacantes',
    map: 'Ascent',
    mapPosition: 'heaven',
    agent: 'Sova',
  },
  imgs: [
    {
      id: '1',
      description: 'Primeiro mire no pontinho roxo indicado',
      img: 'img/pontinho.png',
    },
    {
      id: '2',
      description: 'Depois solte a flexa com 1.5 de força',
      img: 'img/pontinho2.png',
    },
  ],
};

beforeAll(async () => {
  const res = await request.post('/generate_code').send({ GENERATOR_CODE: process.env.GENERATOR_CODE });

  codeGenerate = res.body.code;

  const res2 = await request
    .post('/user')
    .send({ username: mockTests.username2, password: mockTests.password2, code: codeGenerate });

  idUser = res2.body.id;
  post.user = idUser;
  postEdited.user = idUser;

  const res3 = await request.post('/auth').send({ username: mockTests.username2, password: mockTests.password2 });

  // @ts-ignore
  token = { authorization: `Bearer ${res3.body.token}` };
});

afterAll(async () => {
  await request.delete(`/user`).set(token);
  await connection.connection.close();
});

const testDoc = it;

describe('Posts', () => {
  testDoc('Cria um post', async () => {
    const res = await request.post('/post').set(token).send(post);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(post.title);
    expect(res.body.user.id).toEqual(idUser);
    expect(res.body.description).toEqual(post.description);
    expect(res.body.tags.map).toEqual(post.tags.map);
    expect(res.body.imgs[0].description).toEqual('Primeiro mire no pontinho roxo indicado');
    expect(res.body.imgs[1].description).toEqual('Depois solte a flexa com 1.5 de força');
    postId = res.body.id;
  });

  testDoc('Deve impedir um cadastro de um post por alguém não cadastrado', async () => {
    const res = await request.post('/post').send(post);

    expect(res.statusCode).toEqual(403);
  });

  testDoc('Impede o cadastro sem informar os dados corretos', async () => {
    const res = await request.post('/post').set(token).send({});

    expect(res.statusCode).toEqual(400);
  });

  testDoc('Edita um post', async () => {
    const res = await request.put(`/post/${postId}`).set(token).send(postEdited);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(postEdited.title);
  });

  it('Deve Obter um post Editado', async () => {
    const res = await request.get(`/post/${postId}`).set(token);

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual(postEdited.title);
  });

  testDoc('Retorna todos posts', async () => {
    const res = await request.get(`/posts`);
    expect(res.statusCode).toEqual(200);
  });

  testDoc('Deleta um post', async () => {
    const res = await request.delete(`/post/${postId}`).set(token);

    expect(res.statusCode).toEqual(200);
  });
});
