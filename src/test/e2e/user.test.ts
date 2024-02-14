import supertest from 'supertest';
import { SECURITY_CODE } from '@/config/envs';

import { Database } from '@/database/database';
import { app } from '../../app';

const databaseMock = new Database({ verbose: false });

const request = supertest(app);

let token = { authorization: 'eyJhbGciOiJIUzI1NiIsInR5c' };
let codeGenerate = 'código enviado pelos devs';
let codeGenerate2 = 'código enviado pelos devs';

let newUser = {
  code: 'código enviado pelos devs',
  username: 'lucia santos teste',
  password: '1234abc',
};

describe('[2]: 👤 Usuários', () => {
  beforeAll(async () => {
    await databaseMock.e2eTestConnect();

    const res = await request.post('/generate_code').send({ securityCode: SECURITY_CODE });

    codeGenerate = res.body.token;
    newUser = { ...newUser, code: codeGenerate };
    const res2 = await request.post('/generate_code').send({ securityCode: SECURITY_CODE });

    codeGenerate2 = res2.body.token;
  });

  afterAll(async () => {
    await databaseMock.e2eDrop();
    await databaseMock.close();
  });
  /* doc: O cadastro de usuário precisa ser solicitada aos desenvolvedores */

  it('[doc]: ✅ Cadastrar um usuário', async () => {
    /* doc:
     Cadastra um usuário que pode fazer e gerenciar posts no blog
     */

    const response = await request.post('/user').send(newUser);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ username: 'lucia santos teste' });
  });

  it('[doc]: 🚫 Impede o cadastro de um usuário que já existe', async () => {
    const response = await request.post('/user').send({
      code: codeGenerate2,
      username: 'lucia santos teste',
      password: '1234abc',
    });

    expect(response.body).toEqual({
      debug: 'username already exists',
      message: 'Resource already exists',
    });
    expect(response.statusCode).toEqual(409);
  });

  it('✅ setup - Deve fazer login no sistema e obter um token', async () => {
    const response = await request.post('/auth').send({
      username: 'lucia santos teste',
      password: '1234abc',
    });

    token = { authorization: `${response.body.token}` };
  });

  it('[doc]: ✅ Obter a si mesmo', async () => {
    /* Esse endpoint serve para informações como quem está logado, etc. */
    const response = await request.get(`/user`).set(token);

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual({ username: 'lucia santos teste' });
  });

  it('[doc]: ✅ atualiza dados de si mesmo', async () => {
    /* doc:  Isso é útil para alterar dados pessoais, etc.

    > red # Implementação pouco usada
    > Atualmente essa funcionalidade não é usada no blog dicas de valorant

    */
    const response = await request.patch(`/user`).set(token).send({
      username: 'julia',
      password: 'abc987',
    });

    expect(response.body).toEqual({ username: 'julia' });
    expect(response.statusCode).toEqual(200);
  });

  it('[doc]: 🚫 impede de obter usuário sem token', async () => {
    const response = await request.get(`/user`);

    expect(response.body).toEqual({ message: 'TOKEN_IS_INVALID_OR_EXPIRED' });
    expect(response.statusCode).toEqual(401);
  });

  it('[doc]: 🚫 impede edição de usuário sem token', async () => {
    const response = await request.patch(`/user`).send({
      username: 'testeQualquerCoisa',
      password: 'usuarioNotExists',
    });

    expect(response.body).toEqual({ message: 'TOKEN_IS_INVALID_OR_EXPIRED' });
    expect(response.statusCode).toEqual(401);
  });

  it('[doc]: 🚫 impede usuário sem token de deletar', async () => {
    const response = await request.delete(`/user`);

    expect(response.body).toEqual({ message: 'TOKEN_IS_INVALID_OR_EXPIRED' });
    expect(response.statusCode).toEqual(401);
  });

  it('[doc]: ⚠️ deletar a si mesmo', async () => {
    /* doc: Isso remove a conta do próprio usuário */
    const response = await request.delete(`/user`).set(token);

    expect(response.body).toEqual({});
    expect(response.statusCode).toEqual(204);
  });
});
