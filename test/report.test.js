let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)
let token = ''
let idUser = ''

let report = {
  _id: '',
  post_id: '6158689924fd4f9e1c587851',
  email: 'gab@gab.com',
  description: 'Eu acho que seria...',
  screenHeight: 1366,
  screenWidth: 768,
  status: ''
}

beforeAll(() => {
  return request.post('/user').send({ username: 'userTestReport', password: 'userTestReport' }).then(res => {
    idUser = res.body._id
    return request.post('/auth').send({ username: 'userTestReport', password: 'userTestReport' }).then(res2 => {
      token = { authorization:"Bearer " + res2.body.token}
    })
  })
})

afterAll(async () => {
  await request.delete(`/user/${idUser}`)
  await mongoose.connection.close()
})

describe("Deve enviar um report", () => {
  it("Deve enviar um report", () => {
    return request.post('/report')
      .send({
        post_id: report.post_id,
        email: report.email,
        description: report.description,
        screenHeight: report.screenHeight,
        screenWidth: report.screenWidth
      }).then(res => {
        report._id = res.body._id
        expect(res.statusCode).toEqual(200)
        expect(res.body.email).toEqual(report.email)
        expect(res.body.description).toEqual(report.description)
        expect(res.body.screenHeight).toEqual(report.screenHeight)
        expect(res.body.screenWidth).toEqual(report.screenWidth)
      })
  })

  it("Deve retornar 400 quando não informar descrição", () => {
    return request.post('/report')
      .send({
        post_id: '12345123145',
        email: 'gab@gab.com',
        description: '',
        screenHeight: 123,
        screenWidth: 333
      }).then(res => {
        expect(res.statusCode).toEqual(400)
      })
  })

  it("Deve retornar 400 quando não passar parâmetros", () => {
    return request.post('/report')
      .send().then(res => {
        expect(res.statusCode).toEqual(400)
      })
  })

  it("Deve impedir que um usuário não autorizado veja os reports", () => {
    return request.get('/reports')
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  })

  it("Deve permitir que um usuário autorizado veja os reports", () => {
    return request.get('/reports')
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body[0].description).toEqual(report.description)
      })
  })

  it("Deve impedir alterações nos reports por um usuário desconhecido", () => {
    return request.put(`/report/${report._id}`)
      .send({status: 'accepted'})
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  })

  it("Deve permitir a alteração do estado de um report", () => {
    return request.put(`/report/${report._id}`)
      .send({status: 'accepted'})
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('accepted')
      })
  })

  it("Deve permitir a alteração do estado de um report", () => {
    return request.put(`/report/${report._id}`)
      .send({status: 'rejected'})
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.status).toEqual('rejected')
      })
  })

  it("Deve impedir a edição para um status inválido", () => {
    return request.put(`/report/${report._id}`)
      .send({status: 'aaaaaaaaaaaaaaaaaaaaaaaaaaa'})
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(400)
        expect(res.body.error).toEqual('Status para o report inválido!')
      })
  })


  it("Deve impedir que um usuário desconhecido delete o report", () => {
    return request.delete(`/report/${report._id}`)
      .then(res => {
        expect(res.statusCode).toEqual(403)
      })
  })

  it("Deve permitir a deleção de um report", () => {
    return request.delete(`/report/${report._id}`)
      .set(token)
      .then(res => {
        expect(res.statusCode).toEqual(200)
      })
  })
})
