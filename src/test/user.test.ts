/* eslint-disable no-underscore-dangle */
import dotenv from 'dotenv';
import supertest from 'supertest';
import mockTests from '@/mock/mockTests.json';
import { connection } from './mockMongoose';

import { app } from '../app';

dotenv.config();

const request = supertest(app);

const userTest = {
  username: mockTests.username5,
  password: mockTests.password5,
};

let idUser = 'UzI1NiIsInR5cCI6IkpXV';
let token = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5c' };
let codeGenerate = 'código enviado pelos devs';
let codeGenerate2 = 'código enviado pelos devs';

let newUser = {
  code: 'código enviado pelos devs',
  username: 'testSystemAfk37812-++aks22',
  password: 'testSystemAfk37812-++aks22',
};

afterAll(async () => {
  await connection.connection.close();
});

const testDoc = it;

beforeAll(async () => {
  const res = await request.post('/generate_code').send({ GENERATOR_CODE: process.env.GENERATOR_CODE });

  codeGenerate = res.body.code;
  newUser = { ...newUser, code: codeGenerate };
  const res2 = await request.post('/generate_code').send({ GENERATOR_CODE: process.env.GENERATOR_CODE });

  codeGenerate2 = res2.body.code;
});

describe('Gerenciamento de usuários', () => {
  // doc.description: "O cadastro de usuário precisa ser solicitada aos desenvolvedores"

  testDoc('Cadastrar um usuário', async () => {
    const response = await request.post('/user').send(newUser);

    expect(response.statusCode).toEqual(200);
    idUser = response.body._id;
  });

  testDoc('Impede o cadastro de um usuário que já existe', async () => {
    const response = await request.post('/user').send({
      code: codeGenerate2,
      username: userTest.username,
      password: userTest.password,
    });

    expect(response.statusCode).toEqual(409);
  });

  it('Deve fazer login no sistema e obter um token', async () => {
    const response = await request.post('/auth').send({
      username: userTest.username,
      password: userTest.password,
    });

    expect(response.statusCode).toEqual(200);
    // @ts-ignore
    token = { authorization: `Bearer ${response.body.token}` };
  });

  testDoc('Obter a si mesmo', async () => {
    const response = await request.get(`/user`).set(token);

    expect(response.statusCode).toEqual(200);

    expect(response.body.username).toEqual('testSystemAfk37812-++aks22');
    expect(response.body._id).toEqual(idUser);
    expect(response.body.password).toBeUndefined();
  });

  testDoc('atualiza dados de si mesmo', async () => {
    const response = await request.put(`/user`).set(token).send({
      username: mockTests.username6,
      password: mockTests.password6,
    });

    expect(response.statusCode).toEqual(200);
  });

  testDoc('impede de obter usuário sem token', async () => {
    const response = await request.get(`/user`);

    expect(response.statusCode).toEqual(403);
  });

  testDoc('impede edição de usuário sem token', async () => {
    const response = await request.put(`/user`).send({
      username: mockTests.username7,
      password: mockTests.password7,
    });

    expect(response.statusCode).toEqual(403);
  });

  testDoc('impede usuário sem token de deletar', async () => {
    const response = await request.delete(`/user`);
    expect(response.statusCode).toEqual(403);
  });

  testDoc('deletar a si mesmo', async () => {
    // doc.description: "Isso remove a conta do proprio usuário"

    const response = await request.delete(`/user`).set(token);

    expect(response.statusCode).toEqual(200);
  });
});
