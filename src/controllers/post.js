require('dotenv/config')
const express = require('express')
const PostService = require('../service/post')
const viewSerice = require('../service/View')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const dataPost = require('../factories/dataPost')
const { v4: uuidv4 } = require('uuid');
const { bucket, format, Multer, multer } = require('./mode')

function validValues(value) {
  if (value === '' || value === undefined || value === null) {
    return null
  }
  return value
}

router.post('/postLoadFile', multer.single('image'), async(req, res, next) => {
  if (!req.file){
    res.status(400).send('No file uploaded.');

    return;
  }

  if (process.env.MODE_RUN === 'PRODUCTION') {
    const blob = bucket.file(`${Date.now().toString()}-${uuidv4()}`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', err => {
      next(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = format(
       `https://storage.googleapis.com/${bucket.name}/${blob.name}`
      );
      res.json({filename:publicUrl})
    });
    blobStream.end(req.file.buffer);

  } else if(process.env.MODE_RUN === 'DEVELOP') {
    return res.json({filename: req.file['filename']})
  }
})


router.post('/post', userAuth, async (req, res) => {
  let { title, description, tags, imgs } = req.body
  let user = req.data.id

  // Algum valor Obrigatório é nulo
  if( validValues(title) === null ||
      validValues(description) === null ) {
        res.statusCode = 400
        return res.json({error: 'Algum valor inválido'})
    }

  try {
    let newPost = dataPost.Build(await PostService.Create({ title, description, user, tags, imgs }))
    return res.json(newPost)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.put('/post/:id', userAuth, async (req, res) => {
  let { title, description, tags, imgs } = req.body
  let { id } = req.params
  let user = req.data.id

  newImgs = []
  imgs.forEach(img => {
    newImgs.push({
      description: img.description,
      _id: img.id,
      image: img.image,
    })
  })

  // Algum valor Obrigatório é nulo
  if( validValues(title) === null ||
      validValues(description) === null ) {
        res.statusCode = 400
        return res.json({error: 'Algum valor inválido'})
  }

  try {
    let postUpdate = dataPost.Build(await PostService.FindByIdAndUpdate(id,  {title, description, user, tags, imgs: newImgs}))
    return res.json(postUpdate)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.get('/post/:id', async (req, res) => {
  let { id } = req.params

  try {
    let post = dataPost.Build(await PostService.FindById(id))
    return res.json(post)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})


/* Sem cobertura de testes */
/* Sem cobertura de testes */
router.get('/maps', async (req, res) => {
  try {
    let maps = await PostService.findAvaliableMaps()
    return res.json({ maps })
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro ao obter a listagem de mapas'})
  }
})

router.get('/agents/:map', async (req, res) => {
  try {
    let agents = await PostService.findAvaliableAgents(req.params.map)
    return res.json({ agents })
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro ao obter a listagem de Agentes por mapa'})
  }
})

/* Sem cobertura de testes */
/* Sem cobertura de testes */


function testPage(value) {
  // Nunca sera 0
  if(value === undefined) {
    return 0
  }

  if (isNaN(value)) {
    return 0
  }

  let value2 = parseInt(value) - 1
  if(value2 < 0) {
    return 0
  }
  return value2
}



router.get('/tags', async (req, res) => {
    let { agent, map } = req.query

    if(agent && map) {
      posts = await PostService.FindAllTags(agent, map)
    }
    return res.sendStatus(400)
})


router.get('/posts', async (req, res) => {
  try {
    let ip = req.socket.remoteAddress.split(`:`).pop();
    viewSerice.Create(ip)
  } catch(error) {
    console.log('Erro ao registrar IP ', error)
  }

  try {
    let posts;
    let { agent, map, page, filters, idPosts } = req.query

    if(filters === undefined || filters === null || filters === '' || filters === ',') {
      filters = []
    } else {
      filters = filters.split(',')
    }

    if(idPosts !== undefined) {
      idPosts = JSON.parse(idPosts)
    }

    if(agent && map) {
      posts = await PostService.FindAllByMapAndAgent(agent, map, testPage(page), filters)
    }else {
      posts = await PostService.FindAll(testPage(page), idPosts)
    }

    let postsFactories = []
    posts.post.forEach(post => {
      postsFactories.push(dataPost.Build(post))
    })

    return res.json({posts:postsFactories, count: posts.count, tags: posts.tags})
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})


router.delete('/post/:id', userAuth, async (req, res) => {
  let idUser = req.data.id
  let idPost = req.params.id

  try {
    await PostService.DeleteById(idPost, idUser)
    return res.json({})
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

module.exports = router
