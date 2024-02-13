import supertest from 'supertest';
import { SECURITY_CODE } from '@/config/envs';
import { Database } from '@/database/database';
import { app } from '../../app';

const databaseMock = new Database({ verbose: false });

const request = supertest(app);
let codeGenerate = '';
let token = '';
let generateCode = 'HA1496FD';
generateCode = SECURITY_CODE;
const validKey = { securityCode: generateCode };

describe('[0] 🔑 Geração de chaves', () => {
  beforeAll(async () => {
    await databaseMock.e2eTestConnect();
  });

  afterAll(async () => {
    await request.delete(`/user`).set(token);

    await databaseMock.e2eDrop();
    await databaseMock.close();
  });

  it('[doc]: ✅ Criar uma chave', async () => {
    const res = await request.post('/generate_code').send(validKey);

    expect(res.statusCode).toEqual(200);
    expect(res.body.code.length).toBeGreaterThan(10);
    codeGenerate = res.body.code;
  });

  it('[doc]: 🚫 Impede a geração com uma chave inválida', async () => {
    const res = await request.post('/generate_code').send({ securityCode: 'Qualquer chave' });
    expect(res.statusCode).toEqual(404);
  });

  it('🚫 Deve impedir o registro com uma chave inválida Novamente', async () => {
    const res = await request.post('/generate_code').send({ securityCode: 'Qualquer chave novamente' });

    expect(res.statusCode).toEqual(404);
  });

  it('[doc]: 🚫 Deve impedir o registro deu uma nova chave após duas tentativas com erro', async () => {
    const res = await request.post('/generate_code').send({ securityCode: generateCode });
    expect(res.statusCode).toEqual(405);
  });

  it('✅ Deve cadastrar um usuário', async () => {
    const {
      body: { token: token2 },
    } = await request.post('/auth').send({
      username: 'username test',
      password: 'password test',
    });

    await request.delete(`/user`).set({ authorization: `Bearer ${token2}` });

    return request
      .post('/user')
      .send({
        code: codeGenerate,
        username: 'username test',
        password: 'password test',
      })
      .then((res) => {
        expect(res.statusCode).toEqual(200);
        return request
          .post('/auth')
          .send({
            username: 'username test',
            password: 'password test',
          })
          .then((res2) => {
            // @ts-ignore
            token = { authorization: `Bearer ${res2.body.token}` };
          });
      });
  });

  it('🚫 Deve impedir um cadastro com token código repetido', async () => {
    const res = await request.post('/user').send({
      code: codeGenerate,
      username: 'username test',
      password: 'password test',
    });

    expect(res.statusCode).toEqual(403);
  });
});
