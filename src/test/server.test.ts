import supertest from 'supertest';
import { app } from '../app';
import { connection } from './mockMongoose';

const request = supertest(app);

afterAll(async () => {
  await connection.connection.close();
});

describe('Testa se o servidor está rodando', () => {
  it('A aplicação deve responder', () =>
    request.get('/').then((res) => {
      expect(res.statusCode).toEqual(200);
    }));
});
