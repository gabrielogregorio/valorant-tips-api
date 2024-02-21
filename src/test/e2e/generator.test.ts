import { SECURITY_CODE } from '@/config/envs';
import { databaseMock, requestMock } from '@/test/e2e/utils';

let codeGenerate = '';
let generateCode = 'HA1496FD';
generateCode = SECURITY_CODE;
const validKey = { securityCode: generateCode };

describe('[0] 🔑 Geração de chaves', () => {
  beforeAll(async () => {
    await databaseMock.e2eTestConnect();
  });

  afterAll(async () => {
    await databaseMock.e2eDrop();
    await databaseMock.close();
  });

  it('[doc]: ✅ Criar uma chave', async () => {
    const res = await requestMock.post('/code').send(validKey);

    expect(res.statusCode).toEqual(200);
    expect(res.body.token.length).toBeGreaterThan(10);
    codeGenerate = res.body.token;
  });

  it('[doc]: 🚫 Impede a geração com uma chave inválida', async () => {
    const res = await requestMock.post('/code').send({ securityCode: 'Qualquer chave' });
    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({
      debug: 'Token is different from security code',
      message: 'TOKEN_IS_INVALID_OR_EXPIRED',
    });
  });

  it('✅ Deve cadastrar um usuário', async () => {
    const newUser = await requestMock.post('/users').send({
      code: codeGenerate,
      username: 'username test',
      password: 'password test',
    });

    expect(newUser.body).toEqual({ username: 'username test' });
  });

  it('✅ should make authentication with valid user', async () => {
    const newUser = await requestMock.post('/auth').send({
      username: 'username test',
      password: 'password test',
    });

    expect(newUser.body).toEqual({ id: expect.stringContaining(''), token: expect.stringContaining('') }); // fixme
  });

  it('🚫 Deve impedir um cadastro com token código repetido', async () => {
    const res = await requestMock.post('/users').send({
      code: codeGenerate,
      username: 'username test',
      password: 'password test',
    });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toEqual({ message: 'TOKEN_IS_INVALID_OR_EXPIRED' });
  });
});
