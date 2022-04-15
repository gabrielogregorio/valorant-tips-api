/* eslint-disable no-underscore-dangle */
import supertest from 'supertest';
import { connection } from './mockMongoose';
import { app } from '../app';

const request = supertest(app);
let token = '';
let idUser = '';
let codeGenerate = '';

const sugestion = {
  _id: '',
  post_id: '6158689924fd4f9e1c587851',
  email: 'gab@gab.com',
  description: 'Eu acho que seria...',
  status: '',
};

beforeAll(() =>
  request
    .post('/generate_code')
    .send({ GENERATOR_CODE: process.env.GENERATOR_CODE })
    .then((res) => {
      codeGenerate = res.body.code;
      return request
        .post('/user')
        .send({ username: 'userTestSugestion', password: 'userTestSugestion', code: codeGenerate })
        .then((res2) => {
          idUser = res2.body._id;
          return request
            .post('/auth')
            .send({ username: 'userTestSugestion', password: 'userTestSugestion' })
            .then((res3) => {
              // @ts-ignore
              token = { authorization: `Bearer ${res3.body.token}` };
            });
        });
    }),
);

afterAll(async () => {
  await request.delete(`/user/${idUser}`);
  await connection.connection.close();
});

describe('Deve enviar uma sugestão', () => {
  it('Deve enviar uma sugestão', () =>
    request
      .post('/suggestion')
      .send({
        post_id: sugestion.post_id,
        email: sugestion.email,
        description: sugestion.description,
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        sugestion._id = res.body._id;
      }));

  it('Deve retornar 400 quando não informar descrição', () =>
    request
      .post('/suggestion')
      .send({
        post_id: '12345123145',
        email: 'gab@gab.com',
        description: '',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      }));

  it('Deve retornar 400 quando não passar parâmetros', () =>
    request
      .post('/suggestion')
      .send()
      .then((res) => {
        expect(res.statusCode).toEqual(400);
      }));

  it('Deve impedir que um usuário não autorizado veja as sugestões', () =>
    request.get('/suggestions').then((res) => {
      expect(res.statusCode).toEqual(403);
    }));

  it('Deve permitir que um usuário autorizado veja as sugestões', () =>
    request
      .get('/suggestions')
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body[res.body.length - 1].description).toEqual(sugestion.description);
      }));

  it('Deve impedir alterações nas sugestões por um usuário desconhecido', () =>
    request
      .put(`/suggestion/${sugestion._id}`)
      .send({ status: 'accepted' })
      .then((res) => {
        expect(res.statusCode).toEqual(403);
      }));

  it('Deve permitir a alteração do estado de uma sugestão', () =>
    request
      .put(`/suggestion/${sugestion._id}`)
      .send({ status: 'accepted' })
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('accepted');
      }));

  it('Deve permitir a alteração do estado de uma sugestão', () =>
    request
      .put(`/suggestion/${sugestion._id}`)
      .send({ status: 'rejected' })
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        expect(res.body.status).toEqual('rejected');
      }));

  it('Deve impedir a edição para um status inválido', () =>
    request
      .put(`/suggestion/${sugestion._id}`)
      .send({ status: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa' })
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(400);
        expect(res.body.error).toEqual('Status para a sugestão inválido!');
      }));

  it('Deve impedir que um usuário desconhecido delete a sugestão', () =>
    request.delete(`/suggestion/${sugestion._id}`).then((res) => {
      expect(res.statusCode).toEqual(403);
    }));

  it('Deve permitir a deleção de uma sugestão', () =>
    request
      .delete(`/suggestion/${sugestion._id}`)
      .set(token)
      .then((res) => {
        expect(res.statusCode).toEqual(200);
      }));
});
