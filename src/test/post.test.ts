import supertest from 'supertest';
import mockTests from '@/mock/mockTests.json';
import { connection } from './mockMongoose';
import { app } from '../app';

const request = supertest(app);
let codeGenerate = '';
let idUser = '';
let token = '';
let postId = '';

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

beforeAll(() =>
  request
    .post('/generate_code')
    .send({ GENERATOR_CODE: process.env.GENERATOR_CODE })
    .then((res) => {
      codeGenerate = res.body.code;

      return request
        .post('/user')
        .send({ username: mockTests.username2, password: mockTests.password2, code: codeGenerate })
        .then((res2) => {
          idUser = res2.body.id;
          post.user = idUser;
          postEdited.user = idUser;

          return request
            .post('/auth')
            .send({ username: mockTests.username2, password: mockTests.password2 })
            .then((res3) => {
              // @ts-ignore
              token = { authorization: `Bearer ${res3.body.token}` };
            });
        });
    }),
);

afterAll(async () => {
  await request.delete(`/user`).set(token);
  await connection.connection.close();
});

describe('Deve testar o sistema de cadastro de posts', () => {
  it('Deve impedir um cadastro de um post por alguém não cadastrado', async () => {
    const res = await request.post('/post').send(post);

    expect(res.statusCode).toEqual(403);
  });

  it('Deve cadastrar um post', () =>
    request
      .post('/post')
      .set(token)
      .send(post)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual(post.title);
        expect(res.body.user.id).toEqual(idUser);
        expect(res.body.description).toEqual(post.description);
        expect(res.body.tags.map).toEqual(post.tags.map);
        expect(res.body.imgs[0].description).toEqual('Primeiro mire no pontinho roxo indicado');
        expect(res.body.imgs[1].description).toEqual('Depois solte a flexa com 1.5 de força');
        postId = res.body.id;
      }));

  it('Deve retornar 400 para o cadastro de um post sem os dados', () =>
    request
      .post('/post')
      .set(token)
      .send({})
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      }));

  it('Deve Editar um post', () =>
    request
      .put(`/post/${postId}`)
      .set(token)
      .send(postEdited)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual(postEdited.title);
      }));

  it('Deve Obter um post', () =>
    request
      .get(`/post/${postId}`)
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.title).toEqual(postEdited.title);
      }));

  it('Deve Obter todos os posts', () =>
    request.get(`/posts`).then((res) => {
      expect(res.statusCode).toEqual(200);
    }));

  it('Deve Deletar um post', () =>
    request
      .delete(`/post/${postId}`)
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      }));
});
