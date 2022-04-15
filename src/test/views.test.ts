import supertest from 'supertest';
import { connection } from './mockMongoose';
import { app } from '../app';

const request = supertest(app);

let views = 0;
afterAll(async () => {
  await connection.connection.close();
});

describe('Deve Gerenciar as visualizações', () => {
  it('Deve Retornar a quantidade de visualizações', () =>
    request.get('/views').then((res) => {
      expect(res.statusCode).toEqual(200);
      views = res.body.countAll;

      return request
        .post('/views')
        .send({})
        .then((res2) => {
          expect(res2.statusCode).toEqual(200);

          // views + 1
          return request.get('/views').then((res3) => {
            expect(res3.statusCode).toEqual(200);
            expect(res3.body.countAll).toEqual(views + 1);
          });
        });
    }));
});
