let { app, mongoose } = require('../src/app')
let supertest = require('supertest')
let request = supertest(app)

let idUser = ''
let token = ''
let postId = ''
let post = {
  title: 'Titulo de um post maluco',
  description: 'Descrição maluca',
  user: '',
  tags: {
    moment: ['ComeçoPartida'],
    difficult: ['hard'],
    ability: ['Spot'],
    side: ['Atacantes'],
    map: ['Ascent', 'Split'],
    mapPosition: ['heaven'],
    agent: ['Sova'],
  },
  imgs: [
    {
      title: 'Primeiro mire no pontinho roxo indicado',
      img: 'img/pontinho.png'
    },
    {
      title: 'Depois solte a flexa com 1.5 de força',
      img: 'img/pontinho2.png'
    },
  ]
}

let postEdited = {
  title: 'Titulo de um post maluco Editado',
  description: 'Descrição maluca 2',
  user: '',
  tags: {
    moment: ['ComeçoPartida'],
    difficult: ['Facil'],
    ability: ['Spot'],
    side: ['Atacantes'],
    map: ['Ascent', 'Split'],
    mapPosition: ['heaven'],
    agent: ['Sova'],
  },
  imgs: [
    {
      title: 'Primeiro mire no pontinho roxo indicado',
      img: 'img/pontinho.png'
    },
    {
      title: 'Depois solte a flexa com 1.5 de força',
      img: 'img/pontinho2.png'
    },
  ]
}

beforeAll(() => {
  return request.post('/user').send({ username: 'userTest', password: 'userTest' }).then(res => {
    idUser = res.body._id
    post.user = idUser
    postEdited.user = idUser

    return request.post('/auth').send({ username: 'userTest', password: 'userTest' }).then(res => {
      token = { authorization:"Bearer " + res.body.token}
    })
  })
})

afterAll(async () =>{
  await request.delete(`/user`).set(token)
  await mongoose.connection.close()
})


describe('Deve testar o sistema de cadastro de posts', () => {
  it('Deve impedir um cadastro de um post por alguém não cadastrado', () => {
    return request.post('/post').send(post).then(res => {
      expect(res.statusCode).toEqual(403)
    })
  }),

  it('Deve cadastrar um post', () => {
    return request.post('/post').set(token).send(post).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.title).toEqual('Titulo de um post maluco')
      expect(res.body.user).toEqual(idUser)
      expect(res.body.description).toEqual('Descrição maluca')
      expect(res.body.tags.map[1]).toEqual('Split')
      expect(res.body.imgs[0].title).toEqual('Primeiro mire no pontinho roxo indicado')
      postId = res.body._id
    })
  })


  it('Deve retornar 400 para o cadastro de um post sem os dados', () => {
    return request.post('/post').set(token).send({}).then(res => {
      expect(res.statusCode).toEqual(400)
    })
  })


  it('Deve Editar um post', () => {
    return request.put(`/post/${postId}`).set(token).send(postEdited).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.title).toEqual(postEdited.title)
    })
  })

  it('Deve Obter um post', () => {
    return request.get(`/post/${postId}`).set(token).then(res => {
      expect(res.statusCode).toEqual(200)
      expect(res.body.title).toEqual(postEdited.title)
    })
  })

  it('Deve Obter todos os posts', () => {
    return request.get(`/posts`).set(token).then(res => {
      expect(res.statusCode).toEqual(200)
    })
  })

  it('Deve Deletar um post', () => {
    return request.delete(`/post/${postId}`).set(token).then(res => {
      expect(res.statusCode).toEqual(200)
    })
  })
})
