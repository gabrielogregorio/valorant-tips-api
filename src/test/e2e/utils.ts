import supertest from 'supertest';
import mockTests from '@/mock/mockTests.json';
import { SECURITY_CODE } from '@/config/envs';

import { Database } from '@/database/database';
import { app } from '../../app';

const post = {
  title: 'Titulo de um post maluco',
  description: 'Descrição maluca',
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
      _id: '1',
      description: 'Primeiro mire no pontinho roxo indicado',
      image: 'image/pontinho.png',
    },
    {
      _id: '2',
      description: 'Depois solte a flexa com 1.5 de força',
      image: 'img/pontinho2.png',
    },
  ],
};

export const requestMock = supertest(app);
export const createDatabaseMock = () => new Database({ verbose: false });

export const createUserMocker = async (): Promise<{
  userId: string;
  authorization: {
    authorization: string;
  };
}> => {
  const responseGenerateCode = await requestMock.post('/code').send({ securityCode: SECURITY_CODE });

  const codeGenerate = responseGenerateCode.body.token;

  await requestMock
    .post('/users')
    .send({ username: mockTests.username2, password: mockTests.password2, code: codeGenerate });

  const responseCreateUser = await requestMock
    .post('/auth')
    .send({ username: mockTests.username2, password: mockTests.password2 });

  const authorization = { authorization: `${responseCreateUser.body.token}` };

  return { userId: responseCreateUser.body.id, authorization };
};

export const createPostMocker = async (authorization: {
  authorization: string;
}): Promise<{
  postId: string;
}> => {
  const response = await requestMock.post('/posts').set(authorization).send(post);

  return { postId: response.body.id };
};
