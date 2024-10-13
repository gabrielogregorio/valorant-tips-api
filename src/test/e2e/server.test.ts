import statusCode from '@/config/statusCode';
import { requestMock, createDatabaseMock } from '@/test/e2e/utils';

const databaseMock = createDatabaseMock();

describe('💻 Testa se o servidor está rodando', () => {
  beforeAll(async () => {
    await databaseMock.e2eTestConnect();
  });

  afterAll(async () => {
    await databaseMock.e2eDrop();
    await databaseMock.close();
  });

  it('✅ A aplicação deve responder', () =>
    requestMock.get('/').then((res) => {
      expect(res.statusCode).toEqual(statusCode.SUCCESS.code);
    }));
});
