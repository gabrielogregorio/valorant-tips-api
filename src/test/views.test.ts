import supertest from 'supertest';
import { connection } from './mockMongoose';
import { app } from '../app';
import statusCode from '../config/statusCode';

const request = supertest(app);

afterAll(async () => {
  await connection.connection.close();
});

describe('Deve Gerenciar as visualizações', () => {
  it('Deve Retornar a quantidade de visualizações', async () => {
    const res = await request.get('/views');

    expect(res.statusCode).toEqual(statusCode.SUCCESS.code);
    const views = res.body.countAll;

    const res2 = await request.post('/views').send({});

    expect(res2.statusCode).toEqual(statusCode.SUCCESS.code);

    const res3 = await request.get('/views');
    expect(res3.statusCode).toEqual(statusCode.SUCCESS.code);
    expect(res3.body.countAll).toEqual(views + 1);
  });
});
