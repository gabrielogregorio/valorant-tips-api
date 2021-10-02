let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)
let token = ''
let idUser = ''

let sugestion = {
  _id: '',
  post_id: '6158689924fd4f9e1c587851',
  email: 'gab@gab.com',
  description: 'Eu acho que seria...',
  status: ''
}

beforeAll(() => {
  return request.post('/user').send({ username: 'userTestSugestion', password: 'userTestSugestion' }).then(res => {
    idUser = res.body._id
    return request.post('/auth').send({ username: 'userTestSugestion', password: 'userTestSugestion' }).then(res2 => {
      token = { authorization:"Bearer " + res2.body.token}
    })
  })
})

afterAll(async () => {
  await request.delete(`/user/${idUser}`)
  await mongoose.connection.close()
})

describe("Deve enviar uma sugestão", () => {
  it("Deve enviar uma sugestão", () => {
    return request.post('/suggestion')
      .send({
        post_id: sugestion.post_id,
        email: sugestion.email,
        description: sugestion.description
      }).then(res => {
        expect(res.statusCode).toEqual(200)
        sugestion._id = res.body._id
      })
  })

  it("Deve retornar 400 quando não informar descrição", () => {
    return request.post('/suggestion')
      .send({
        post_id: '12345123145',
        email: 'gab@gab.com',
        description: ''
      }).then(res => {
        expect(res.statusCode).toEqual(400)
      })
  })

  it("Deve retornar 400 quando não passar parâmetros", () => {
    return request.post('/suggestion')
      .send().then(res => {
        expect(res.statusCode).toEqual(400)
      })
  })

  it("Deve impedir que um usuário não autorizado veja as sugestões", () => {
    return request.get('/suggestions')
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  })

  it("Deve permitir que um usuário autorizado veja as sugestões", () => {
    return request.get('/suggestions')
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].description).toEqual(sugestion.description)
      })
  })

  it("Deve impedir alterações nas sugestões por um usuário desconhecido", () => {
    return request.put(`/suggestion/${sugestion._id}`)
      .send({status: 'accepted'})
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  })

  it("Deve permitir a alteração do estado de uma sugestão", () => {
    return request.put(`/suggestion/${sugestion._id}`)
      .send({status: 'accepted'})
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('accepted')
      })
  })

  it("Deve permitir a alteração do estado de uma sugestão", () => {
    return request.put(`/suggestion/${sugestion._id}`)
      .send({status: 'rejected'})
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('rejected')
      })
  })

  it("Deve impedir a edição para um status inválido", () => {
    return request.put(`/suggestion/${sugestion._id}`)
      .send({status: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa'})
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Status para a sugestão inválido!')
      })
  })



  it("Deve impedir que um usuário desconhecido delete a sugestão", () => {
    return request.delete(`/suggestion/${sugestion._id}`)
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  })

  it("Deve permitir a deleção de uma sugestão", () => {
    return request.delete(`/suggestion/${sugestion._id}`)
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
      })
  })
})
