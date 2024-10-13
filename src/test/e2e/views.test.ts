import statusCode from '@/config/statusCode';
import { databaseMock, requestMock } from '@/test/e2e/utils';

let views = 0;

describe('👀 Visualizações', () => {
  beforeAll(async () => {

    await databaseMock.e2eTestConnect();

  });

  afterAll(async () => {

    await databaseMock.e2eDrop();
    await databaseMock.close();

  });

  it('[doc]: ✅ Retorna quantidade de visualizações', async () => {
    /* Retorna quantos views a API recebeu */
    const res = await requestMock.get('/views');
    expect(res.body.countAll).toBeDefined();
    expect(res.body.countIps).toBeDefined();

    const data = {
      body: {
        ...res.body,
        countAll: 33,
        countIps: 1,
      },
    };

    expect(res.statusCode).toEqual(200);
    expect(data.body).toEqual({ countAll: 33, countIps: 1 });
    views = res.body.countAll;
  });

  it('[doc]: ✅ Cria nova visualização', async () => {
    /* doc: Essa rota registra a quantidade de visualizações que o site teve, não substituindo claro ferramentas de analytics */
    const res = await requestMock.post('/views').send({});
    expect(res.body).toEqual({});
    expect(res.statusCode).toEqual(204);
  });

  it('✅ Retorna visualizações + 1', async () => {
    const res = await requestMock.get('/views');
    expect(res.statusCode).toEqual(statusCode.SUCCESS.code);
    expect(res.body.countAll).toEqual(views + 1);
  });
});
