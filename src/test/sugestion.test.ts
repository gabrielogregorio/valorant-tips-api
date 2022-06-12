/* eslint-disable no-underscore-dangle */
import supertest from 'supertest';
import mockTests from '@/mock/mockTests.json';
import { connection } from './mockMongoose';
import { app } from '../app';

const request = supertest(app);
let token = { Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5c' };
let idUser = '';
let codeGenerate = '';

const sugestion = {
  _id: '',
  post_id: '6158689924fd4f9e1c587851',
  email: 'gab@gab.com',
  description: 'Eu acho que seria...',
  status: '',
};

const testDoc = it;

let suggestionId = '629cfd7adc5df3a582ff57c6';

beforeAll(async () => {
  const res = await request.post('/generate_code').send({ GENERATOR_CODE: process.env.GENERATOR_CODE });

  codeGenerate = res.body.code;

  const res2 = await request
    .post('/user')
    .send({ username: mockTests.username3, password: mockTests.password3, code: codeGenerate });

  idUser = res2.body._id;

  const res3 = await request.post('/auth').send({ username: mockTests.username3, password: mockTests.password3 });

  // @ts-ignore
  token = { authorization: `Bearer ${res3.body.token}` };
});

afterAll(async () => {
  await request.delete(`/user/${idUser}`);
  await connection.connection.close();
});

describe('Gerenciamento de sugestões', () => {
  testDoc('Enviar uma sugestão', async () => {
    const res = await request.post('/suggestion').send({
      post_id: '6158689924fd4f9e1c587851',
      email: 'gab@gab.com',
      description: 'Eu acho que seria...',
    });

    expect(res.statusCode).toEqual(200);
    sugestion._id = res.body._id;
  });

  testDoc('Impede o registro de uma sugestão sem conteúdo correto', async () => {
    const res = await request.post('/suggestion').send({
      post_id: '12345123145',
      email: 'gab@gab.com',
      description: '',
    });

    expect(res.statusCode).toEqual(400);
  });

  test('Deve retornar 400 quando não passar parâmetros', async () => {
    const res = await request.post('/suggestion').send();

    expect(res.statusCode).toEqual(400);
  });

  testDoc('Retorna sugestões', async () => {
    const res = await request.get('/suggestions').set(token);

    expect(res.statusCode).toEqual(200);
    expect(res.body[res.body.length - 1].description).toEqual(sugestion.description);
  });

  testDoc('Impede que um usuários não autorizado vejam as sugestões', async () => {
    const res = await request.get('/suggestions');
    expect(res.statusCode).toEqual(403);
  });

  testDoc('Altera o status para aceito', async () => {
    suggestionId = sugestion._id;
    const res = await request.put(`/suggestion/${suggestionId}`).set(token).send({ status: 'accepted' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('accepted');
  });

  testDoc('Altera o status para rejeitado', async () => {
    suggestionId = sugestion._id;
    const res = await request.put(`/suggestion/${suggestionId}`).set(token).send({ status: 'rejected' });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toEqual('rejected');
  });

  testDoc('Impedir atualização de status sem o token', async () => {
    suggestionId = sugestion._id;
    const res = await request.put(`/suggestion/${suggestionId}`).send({ status: 'accepted' });

    expect(res.statusCode).toEqual(403);
  });

  testDoc('Impede alteração por um status inexistente', async () => {
    suggestionId = sugestion._id;
    const res = await request.put(`/suggestion/${suggestionId}`).set(token).send({ status: 'any' });

    expect(res.statusCode).toEqual(400);
    expect(res.body.error).toEqual('Status para a sugestão inválido!');
  });

  testDoc('Deleta uma sugestão', async () => {
    suggestionId = sugestion._id;
    const res = await request.delete(`/suggestion/${suggestionId}`).set(token);

    expect(res.statusCode).toEqual(200);
  });

  testDoc('Impede a exclusão de uma sugestão por um desconhecido', async () => {
    suggestionId = sugestion._id;
    const res = await request.delete(`/suggestion/${suggestionId}`);

    expect(res.statusCode).toEqual(403);
  });
});
