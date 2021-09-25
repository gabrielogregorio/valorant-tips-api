let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)

let idUser = ''
let token = ''

afterAll(async () =>{
  await mongoose.connection.close()
})

describe("Testa o CRUD de usuários", () => {
  it("Deve cadastrar um usuário", () => {
    return request.post('/user')
      .send({
        username: 'testSystemAfk37812-++aks22',
        password: 'testSystemAfk37812-++aks22'
      }).then(res => {
      expect(res.statusCode).toEqual(200)
      idUser = res.body._id
    })
  }),

  it("Deve fazer login no sistema e obter um token", () => {
    return request.post('/auth')
      .send({
        username: 'testSystemAfk37812-++aks22',
        password: 'testSystemAfk37812-++aks22'
      }).then(res => {
      expect(res.statusCode).toEqual(200)
      token = { authorization:"Bearer " + res.body.token}
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
      })
  }),

  it("Deve impedir um usuário com token inválido de Editar um usuário", () => {
    return request.put(`/user`)
      .send({
        username: 'abctestSystemAfk37812-++aks22',
        password: 'abctestSystemAfk37812-++aks22'
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
