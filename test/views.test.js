let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)

let views = 0
afterAll(async () =>{
  await mongoose.connection.close()
})

describe('Deve Gerenciar as visualizações', () => {
  it('Deve Retornar a quantidade de visualizações', () => {
    return request.get('/views').then(res => {
      expect(res.statusCode).toEqual(200)
      views = res.body.countAll

      // views + 1
      return request.get('/views').then(res => {
        expect(res.statusCode).toEqual(200)
        expect(res.body.countAll).toEqual(views + 1)
      })
    })
  })

  it('Deve cadastrar uma view', () => {
    return request.post('/views').send({}).then(res => {
      expect(res.statusCode).toEqual(200)
    })
  })
})
