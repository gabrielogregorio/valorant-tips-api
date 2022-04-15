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

let idUser = '';
let token = null;
let codeGenerate = '';
let codeGenerate2 = '';

afterAll(async () => {
  await connection.connection.close();
});

beforeAll(() =>
  request
    .post('/generate_code')
    .send({ GENERATOR_CODE: process.env.GENERATOR_CODE })
    .then((res) => {
      codeGenerate = res.body.code;
      return request
        .post('/generate_code')
        .send({ GENERATOR_CODE: process.env.GENERATOR_CODE })
        .then((res2) => {
          codeGenerate2 = res2.body.code;
        });
    }),
);

describe('Testa o CRUD de usuários', () => {
  it('Deve cadastrar um usuário', async () => {
    const response = await request.post('/user').send({
      code: codeGenerate,
      username: userTest.password,
      password: userTest.username,
    });

    expect(response.statusCode).toEqual(200);
    idUser = response.body._id;
  });

  it('Deve retornar 409 ao tentar cadastrar um usuário que já existe', async () => {
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
    token = { authorization: `Bearer ${response.body.token}` };
  });

  it('Deve retornar 404 para um usuário não cadastrado tentando fazer login no sistemas', async () => {
    const response = await request.post('/auth').send({
      username: mockTests.username4NotRegistered,
      password: mockTests.password4NotRegistered,
    });

    expect(response.statusCode).toEqual(404);
  });

  it('Deve retornar 403 para um usuário com senha inválida tentando fazer login no sistemas', async () => {
    const response = await request.post('/auth').send({
      username: userTest.username,
      password: mockTests.password4NotRegistered,
    });

    expect(response.statusCode).toEqual(403);
  });

  it('Deve impedir um usuário com token inválido de obter os usuários', async () => {
    const response = await request.get(`/user`);

    expect(response.statusCode).toEqual(403);
  });

  it('Deve Obter um usuário', async () => {
    const response = await request.get(`/user`).set(token);

    expect(response.statusCode).toEqual(200);
    expect(response.body._id).toEqual(idUser);
    expect(response.body.password).toBeUndefined();
  });

  it('Deve impedir um usuário com token inválido de Editar um usuário', async () => {
    const response = await request.put(`/user`).send({
      username: mockTests.username7,
      password: mockTests.password7,
    });

    expect(response.statusCode).toEqual(403);
  });

  it('Deve Editar um usuário', async () => {
    const response = await request.put(`/user`).set(token).send({
      username: mockTests.username6,
      password: mockTests.password6,
    });

    expect(response.statusCode).toEqual(200);
  });

  it('Deve impedir um usuário com token inválido de  Deletar um usuário', async () => {
    const response = await request.delete(`/user`);
    expect(response.statusCode).toEqual(403);
  });

  it('Deve Deletar um usuário', async () => {
    const response = await request.delete(`/user`).set(token);

    expect(response.statusCode).toEqual(200);
  });
});
