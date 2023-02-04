import { Database } from '@/database/database';
import supertest from 'supertest';
import statusCode from '@/config/statusCode';
import { app } from '../../app';

const databaseMock = new Database({ verbose: false });

const request = supertest(app);

describe('💻 Testa se o servidor está rodando', () => {
  beforeAll(async () => {
    await databaseMock.e2eTestConnect();
  });

  afterAll(async () => {
    await databaseMock.e2eDrop();
    await databaseMock.close();
  });

  it('✅ A aplicação deve responder', () =>
    request.get('/').then((res) => {
      expect(res.statusCode).toEqual(statusCode.SUCCESS.code);
    }));
});
