require('dotenv/config')
const express = require('express')
const PostService = require('../service/post')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const { bucket } = require('./bucket')
const Multer = require('multer')
const dataPost = require('../factories/dataPost')
const { v4: uuidv4 } = require('uuid');
const {format} = require('util');

const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 0.9 * 1024 * 1024 // 5mb
  }
})

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

  // Algum valor Obrigatório é nulo
  if( validValues(title) === null ||
      validValues(description) === null ) {
        res.statusCode = 400
        return res.json({error: 'Algum valor inválido'})
  }

  try {
    let postUpdate = dataPost.Build(await PostService.FindByIdAndUpdate(id,  {title, description, user, tags, imgs}))
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

router.get('/posts', async (req, res) => {
  try {
    let posts;
    let { agent, map } = req.query

    if(agent && map) {
      posts = await PostService.FindAllByMapAndAgent(agent, map)
    }else {
      posts = await PostService.FindAll()
    }

    let postsFactories = []
    posts.forEach(post => {
      postsFactories.push(dataPost.Build(post))
    })

    return res.json(postsFactories)
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
