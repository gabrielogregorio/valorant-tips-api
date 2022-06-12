/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import supertest from 'supertest';
import { connection } from './mockMongoose';
import { app } from '../app';

dotenv.config();

const request = supertest(app);

let token = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5c' };
let codeGenerate = 'código enviado pelos devs';

let newUser = {
  code: 'código enviado pelos devs',
  username: 'teste.mariana',
  password: 'teste.password',
};

afterAll(async () => {
  await connection.connection.close();
});

const testDoc = it;

beforeAll(async () => {
  const res = await request.post('/generate_code').send({ GENERATOR_CODE: process.env.GENERATOR_CODE });

  codeGenerate = res.body.code;
  newUser = { ...newUser, code: codeGenerate };
  await request.post('/generate_code').send({ GENERATOR_CODE: process.env.GENERATOR_CODE });
});

describe('Realiza Autenticação', () => {
  // doc.description: "O cadastro de usuário precisa ser solicitada aos desenvolvedores"

  it('Cadastrar um usuário', async () => {
    const response = await request.post('/user').send(newUser);

    expect(response.statusCode).toEqual(200);
  });

  testDoc('realiza login e obtém um token jwt', async () => {
    const response = await request.post('/auth').send({
      username: 'teste.mariana',
      password: 'teste.password',
    });

    expect(response.statusCode).toEqual(200);
    // @ts-ignore
    token = { authorization: `Bearer ${response.body.token}` };
  });

  testDoc('impede o login de usuário não cadastrado', async () => {
    const response = await request.post('/auth').send({
      username: 'test',
      password: 'test',
    });

    expect(response.statusCode).toEqual(404);
  });

  testDoc('impede o login com senha inválida', async () => {
    const response = await request.post('/auth').send({
      username: 'teste.mariana',
      password: '123',
    });

    expect(response.statusCode).toEqual(403);
  });

  testDoc('deletar a própria conta', async () => {
    const response = await request.delete(`/user`).set(token);

    expect(response.statusCode).toEqual(200);
  });
});
