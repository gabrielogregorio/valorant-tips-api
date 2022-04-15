import dotenv from 'dotenv';
import supertest from 'supertest';
import { connection } from './mockMongoose';
import { app } from '../app';

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
  it('Deve Criar uma chave e retorna-la', () =>
    request
      .post('/generate_code')
      .send({ GENERATOR_CODE })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.code.length).toBeGreaterThan(10);
        codeGenerate = res.body.code;
      }));

  it('Deve impedir o registro com uma chave inválida', () =>
    request
      .post('/generate_code')
      .send({ GENERATOR_CODE: 'Qualquer chave' })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      }));

  it('Deve impedir o registro com uma chave inválida Novamente', () =>
    request
      .post('/generate_code')
      .send({ GENERATOR_CODE: 'Qualquer chave novamente' })
      .then((res) => {
        expect(res.statusCode).toEqual(404);
      }));

  it('Deve impedir o registro deu uma nova chave após duas tentativas com erro', () =>
    request
      .post('/generate_code')
      .send({ GENERATOR_CODE })
      .then((res) => {
        expect(res.statusCode).toEqual(405);
      }));

  it('Deve cadastrar um usuário', async () => {
    try {
      const {
        body: { token: token2 },
      } = await request.post('/auth').send({
        username: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
        password: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
      });

      await request.delete(`/user`).set({ authorization: `Bearer ${token2}` });
    } catch (error) {}

    return request
      .post('/user')
      .send({
        code: codeGenerate,
        username: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
        password: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        return request
          .post('/auth')
          .send({
            username: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
            password: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
          })
          .then((res2) => {
            // @ts-ignore
            token = { authorization: `Bearer ${res2.body.token}` };
          });
      });
  });

  it('Deve impedir um cadastro com token código repetido', () =>
    request
      .post('/user')
      .send({
        code: codeGenerate,
        username: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
        password: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(403);
      }));
});
