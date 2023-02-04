import supertest from 'supertest';
import { GENERATOR_CODE } from '@/config/envs';
import { Database } from '@/database/database';
import { app } from '../../app';

const request = supertest(app);

const databaseMock = new Database({ verbose: false });

let token = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5c' };
let codeGenerate = 'código enviado pelos devs';

let newUser = {
  code: 'código enviado pelos devs',
  username: 'teste.mariana',
  password: 'teste.password',
};

describe('[1] 🔐 Autenticação', () => {
  /* doc: O cadastro de usuário precisa ser solicitada aos desenvolvedores */
  beforeAll(async () => {
    await databaseMock.e2eTestConnect();

    const res = await request.post('/generate_code').send({ GENERATOR_CODE });

    codeGenerate = res.body.code;
    newUser = { ...newUser, code: codeGenerate };
  });

  afterAll(async () => {
    await databaseMock.e2eDrop();
    await databaseMock.close();
  });

  it('✅ Cadastrar um usuário', async () => {
    const responseCreate = await request.post('/user').send(newUser);

    expect(responseCreate.statusCode).toEqual(200);
    expect(responseCreate.body).toEqual({ username: 'teste.mariana' });
  });

  it('[doc]: ✅ realiza login e obtém um token jwt', async () => {
    const responseLogin = await request.post('/auth').send({
      username: 'teste.mariana',
      password: 'teste.password',
    });

    expect(responseLogin.body.token).toBeDefined();
    expect(responseLogin.body.id).toBeDefined();

    const dataMock = {
      body: {
        ...responseLogin.body,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
        id: '62a69b0137322c68b8c6b111',
      },
    };

    expect(responseLogin.statusCode).toEqual(200);
    expect(dataMock.body).toEqual({
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      id: '62a69b0137322c68b8c6b111',
    });
    // @ts-ignore
    token = { authorization: `Bearer ${responseLogin.body.token}` };
  });

  it('[doc]: 🚫 impede o login de usuário não cadastrado', async () => {
    const responseUser = await request.post('/auth').send({
      username: 'test',
      password: 'test',
    });

    expect(responseUser.body).toEqual({ NAME: 'USER_NOT_EXISTS' });
    expect(responseUser.statusCode).toEqual(404);
  });

  it('[doc]: 🚫 impede o login com senha inválida', async () => {
    const responseBlock = await request.post('/auth').send({
      username: 'teste.mariana',
      password: '123',
    });
    expect(responseBlock.body).toEqual({ NAME: 'PASSWORD_IS_INVALID' });
    expect(responseBlock.statusCode).toEqual(404);
  });

  it('[doc]: ⚠️ deletar a própria conta', async () => {
    const responseDelete = await request.delete(`/user`).set(token);

    expect(responseDelete.body).toEqual({});
    expect(responseDelete.statusCode).toEqual(200);
  });
});
