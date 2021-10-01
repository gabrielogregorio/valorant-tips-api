let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)

let userTest = {
  username: 'testSystemAfk37812-++aks22',
  password: 'testSystemAfk37812-++aks22'
}

let idUser = ''
let token = ''

afterAll(async () =>{
  await mongoose.connection.close()
})

describe("Testa o CRUD de usuários", () => {
  it("Deve cadastrar um usuário", () => {
    return request.post('/user')
      .send({
        username: userTest.password,
        password: userTest.username
      }).then(res => {
      expect(res.statusCode).toEqual(200)
      idUser = res.body._id
    })
  }),

  it("Deve retornar 409 ao tentar cadastrar um usuário que já existe", () => {
    return request.post('/user')
      .send({
        username: userTest.username,
        password: userTest.password
      }).then(res => {
      expect(res.statusCode).toEqual(409)
    })
  }),


  it("Deve fazer login no sistema e obter um token", () => {
    return request.post('/auth')
      .send({
        username: userTest.username,
        password: userTest.password
      }).then(res => {
      expect(res.statusCode).toEqual(200)
      token = { authorization:"Bearer " + res.body.token}
    })
  }),


  it("Deve retornar 404 para um usuário não cadastrado tentando fazer login no sistemas", () => {
    return request.post('/auth')
      .send({
        username: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@',
        password: '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
      }).then(res => {
      expect(res.statusCode).toEqual(404)
    })
  }),

  it("Deve retornar 403 para um usuário com senha inválida tentando fazer login no sistemas", () => {
    return request.post('/auth')
      .send({
        username: userTest.username,
        password: 'senhaInvalida'
      }).then(res => {
      expect(res.statusCode).toEqual(403)
    })
  }),


  it("Deve impedir um usuário com token inválido de obter os usuários", () => {
    return request.get(`/user`)
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  }),

  it("Deve Obter um usuário", () => {
    return request.get(`/user`)
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body._id).toEqual(idUser)
        expect(res.body.password).toBeUndefined()
      })
  }),

  it("Deve impedir um usuário com token inválido de Editar um usuário", () => {
    return request.put(`/user`)
      .send({
        username: 'testeQualquerCoisa',
        password: 'usuarioNotExists'
      }).then(res => {
      expect(res.statusCode).toEqual(403)
    })
  }),

  it("Deve Editar um usuário", () => {
    return request.put(`/user`)
      .set(token)
      .send({
        username: 'abctestSystemAfk37812-++aks22',
        password: 'abctestSystemAfk37812-++aks22'
      }).then(res => {
      expect(res.statusCode).toEqual(200)
    })
  }),

  it("Deve impedir um usuário com token inválido de  Deletar um usuário", () => {
    return request.delete(`/user`)
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  })

  it("Deve Deletar um usuário", () => {
    return request.delete(`/user`)
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
      })
  })
})
