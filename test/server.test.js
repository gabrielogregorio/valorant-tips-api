let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)

afterAll(async () =>{
  await mongoose.connection.close()
})

describe("Testa se o servidor está rodando", () => {
  it("A aplicação deve responder", () => {
    return request.get('/').then(res => {
      expect(res.statusCode).toEqual(200)
    })
  })
})