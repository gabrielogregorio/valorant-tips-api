import mockTests from '@/mock/mockTests.json';
import { SECURITY_CODE } from '@/config/envs';
import { databaseMock, requestMock } from '@/test/e2e/utils';

let codeGenerate = '';
let token = { authorization: '' };
let postId = '213';

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

const postEdited = {
  title: 'Titulo de um post maluco Editado',
  description: 'Descrição maluca 2',
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
      _id: '1',
      description: 'Primeiro mire no pontinho roxo indicado',
      image: 'img/pontinho.png',
    },
    {
      _id: '2',
      description: 'Depois solte a flexa com 1.5 de força',
      image: 'img/pontinho2.png',
    },
  ],
};

beforeAll(async () => {
  await databaseMock.e2eTestConnect();

  const res = await requestMock.post('/code').send({ securityCode: SECURITY_CODE });

  codeGenerate = res.body.token;
  await requestMock
    .post('/users')
    .send({ username: mockTests.username2, password: mockTests.password2, code: codeGenerate });
  const res3 = await requestMock.post('/auth').send({ username: mockTests.username2, password: mockTests.password2 });

  token = { authorization: `${res3.body.token}` };
});

afterAll(async () => {
  await databaseMock.e2eDrop();
  await databaseMock.close();
});

describe('📔 Posts', () => {
  it('[doc] - ✅ Cria um post', async () => {
    const res = await requestMock.post('/posts').set(token).send(post);
    postId = res.body.id;

    const bodyResponse = {
      ...res.body,
      id: postId,
    };
    expect(bodyResponse).toMatchObject({
      id: postId,
      title: 'Titulo de um post maluco',
      description: 'Descrição maluca',
      user: {},
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
        { description: 'Primeiro mire no pontinho roxo indicado' },
        { description: 'Depois solte a flexa com 1.5 de força' },
      ],
    });
    expect(res.statusCode).toEqual(200);
  });

  it('[doc] - 🚫 Deve impedir um cadastro de um post por alguém não cadastrado', async () => {
    const res = await requestMock.post('/posts').send(post);
    expect(res.body).toEqual({ message: 'TOKEN_IS_INVALID_OR_EXPIRED' });
    expect(res.statusCode).toEqual(401);
  });

  it('[doc] - 🚫 Impede o cadastro sem informar os dados corretos', async () => {
    const res = await requestMock.post('/posts').set(token).send({});
    expect(res.body).toEqual({ message: 'PAYLOAD_IS_INVALID', debug: expect.stringContaining('') }); // remove debug
    expect(res.statusCode).toEqual(400);
  });

  it('[doc] - ✅Edita um post', async () => {
    const res = await requestMock.put(`/posts/${postId}`).set(token).send(postEdited);
    expect(res.statusCode).toEqual(200);

    expect(res.body.id).toBeDefined();
    const bodyExpected = {
      ...res.body,
    };
    expect(bodyExpected).toEqual({
      id: postId,
      title: 'Titulo de um post maluco Editado',
      description: 'Descrição maluca 2',
      user: {
        username: 'userTest',
      },
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
        { id: '1', description: 'Primeiro mire no pontinho roxo indicado', image: 'img/pontinho.png' },
        { id: '2', description: 'Depois solte a flexa com 1.5 de força', image: 'img/pontinho2.png' },
      ],
    });
  });

  it('✅ Deve Obter um post Editado', async () => {
    const res = await requestMock.get(`/posts/${postId}`).set(token);

    const bodyExpected = {
      ...res.body,
    };

    expect(res.statusCode).toEqual(200);
    expect(bodyExpected).toEqual({
      id: postId,
      title: 'Titulo de um post maluco Editado',
      description: 'Descrição maluca 2',
      user: { username: 'userTest' },
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
        { id: '1', description: 'Primeiro mire no pontinho roxo indicado', image: 'img/pontinho.png' },
        { id: '2', description: 'Depois solte a flexa com 1.5 de força', image: 'img/pontinho2.png' },
      ],
    });
  });

  it('[doc] - ✅ Retorna todos posts', async () => {
    const res = await requestMock.get(`/posts`);

    expect(res.body).toEqual({
      posts: [
        {
          id: postId,
          title: 'Titulo de um post maluco Editado',
          description: 'Descrição maluca 2',
          user: {
            username: 'userTest',
          },
          tags: {
            ability: 'Spot',
            agent: 'Sova',
            difficult: 'Facil',
            map: 'Ascent',
            mapPosition: 'heaven',
            moment: 'ComeçoPartida',
            side: 'Atacantes',
          },
          imgs: [
            {
              description: 'Primeiro mire no pontinho roxo indicado',
              image: 'img/pontinho.png',
              id: '1',
            },
            {
              description: 'Depois solte a flexa com 1.5 de força',
              image: 'img/pontinho2.png',
              id: '2',
            },
          ],
        },
      ],
    });

    expect(res.statusCode).toEqual(200);
  });

  it('[doc] - ⚠️ Deleta um post', async () => {
    const res = await requestMock.delete(`/posts/${postId}`).set(token);

    expect(res.statusCode).toEqual(204);
    expect(res.body).toEqual({});
  });
});
