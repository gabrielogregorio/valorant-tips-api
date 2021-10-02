require('dotenv/config')
let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)
let codeGenerate = ''
let idUser = ''
let token = ''

// Chave que gera uma outra chave usuável para o cadastro de um novo usuário
const GENERATOR_CODE = process.env.GENERATOR_CODE

afterAll(async () =>{
  await request.delete(`/user`).set(token)
  await mongoose.connection.close()
})

describe("Testa a geração de uma chave que permite o registro de um usuário", () => {
  it("Deve Criar uma chave e retorna-la", () => {
    return request.post('/generate_code')
      .send({ GENERATOR_CODE }).then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.code.length).toBeGreaterThan(10)
        codeGenerate = res.body.code
      })
  })

  it("Deve impedir o registro com uma chave inválida", () => {
    return request.post('/generate_code')
      .send({ GENERATOR_CODE: 'Qualquer chave' }).then(res => {
        expect(res.statusCode).toEqual(404)
      })
  })

  it("Deve impedir o registro com uma chave inválida Novamente", () => {
    return request.post('/generate_code')
      .send({ GENERATOR_CODE: 'Qualquer chave novamente' }).then(res => {
        expect(res.statusCode).toEqual(404)
      })
  })

  it("Deve impedir o registro deu uma nova chave após duas tentativas com erro", () => {
    return request.post('/generate_code')
      .send({ GENERATOR_CODE }).then(res => {
        expect(res.statusCode).toEqual(405)
      })
  })

  it("Deve cadastrar um usuário", () => {
    return request.post('/user')
      .send({
        code: codeGenerate,
        username: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
        password: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX'
      }).then(res => {
      expect(res.statusCode).toEqual(200)
      idUser = res.body._id
      return request.post('/auth').send({ username: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX', password: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX' }).then(res => {
        token = { authorization:"Bearer " + res.body.token}
      })
    })
  })

  it("Deve impedir um cadastro com token código repetido", () => {
    return request.post('/user')
      .send({
        code: codeGenerate,
        username: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX',
        password: '1231KHGJADSUOIWYQEYO@@###@##@#OIUQADXX'
      }).then(res => {
      expect(res.statusCode).toEqual(403)
    })
  })
})
