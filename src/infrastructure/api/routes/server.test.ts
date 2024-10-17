import { statusCode } from '@/config/statusCode';
import { createDatabaseMock, requestMock } from '../../../test/utils';

const databaseMock = createDatabaseMock();

describe('Server', () => {
  beforeAll(async () => {
    await databaseMock.e2eTestConnect();
  });

  afterAll(async () => {
    await databaseMock.e2eDrop();
    await databaseMock.close();
  });

  it('should application response on get /', () =>
    requestMock.get('/').then((res) => {
      expect(res.statusCode).toEqual(statusCode.SUCCESS.code);
    }));
});
