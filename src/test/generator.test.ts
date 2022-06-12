import dotenv from 'dotenv';
import supertest from 'supertest';
import mockTests from '@/mock/mockTests.json';
import { connection } from './mockMongoose';
import { app } from '../app';
import statusCode from '../config/statusCode';

dotenv.config();

const request = supertest(app);
let codeGenerate = '';
let token = '';
const { GENERATOR_CODE } = process.env;

describe('Testa a geração de uma chave que permite o registro de um usuário', () => {
  afterAll(async () => {
    try {
      await request.delete(`/user`).set(token);

      await connection.connection.close();
    } catch (err) {}
  });

  it('Deve Criar uma chave e retorna-la', async () => {
    const res = await request.post('/generate_code').send({ GENERATOR_CODE });

    expect(res.statusCode).toEqual(statusCode.SUCCESS.code);
    expect(res.body.code.length).toBeGreaterThan(10);
    codeGenerate = res.body.code;
  });

  it('Deve impedir o registro com uma chave inválida', async () => {
    const res = await request.post('/generate_code').send({ GENERATOR_CODE: 'Qualquer chave' });
    expect(res.statusCode).toEqual(statusCode.NOT_FOUND.code);
  });

  it('Deve impedir o registro com uma chave inválida Novamente', async () => {
    const res = await request.post('/generate_code').send({ GENERATOR_CODE: 'Qualquer chave novamente' });

    expect(res.statusCode).toEqual(statusCode.NOT_FOUND.code);
  });

  it('Deve impedir o registro deu uma nova chave após duas tentativas com erro', async () => {
    const res = await request.post('/generate_code').send({ GENERATOR_CODE });
    expect(res.statusCode).toEqual(statusCode.NOT_ALLOWED.code);
  });

  it('Deve cadastrar um usuário', async () => {
    try {
      const {
        body: { token: token2 },
      } = await request.post('/auth').send({
        username: mockTests.username1,
        password: mockTests.password1,
      });

      await request.delete(`/user`).set({ authorization: `Bearer ${token2}` });
    } catch (error) {}

    return request
      .post('/user')
      .send({
        code: codeGenerate,
        username: mockTests.username1,
        password: mockTests.password1,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        return request
          .post('/auth')
          .send({
            username: mockTests.username1,
            password: mockTests.password1,
          })
          .then((res2) => {
            // @ts-ignore
            token = { authorization: `Bearer ${res2.body.token}` };
          });
      });
  });

  it('Deve impedir um cadastro com token código repetido', async () => {
    const res = await request.post('/user').send({
      code: codeGenerate,
      username: mockTests.username1,
      password: mockTests.password1,
    });

    expect(res.statusCode).toEqual(403);
  });
});
