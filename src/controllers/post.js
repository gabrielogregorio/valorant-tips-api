require('dotenv/config')
const express = require('express')
const PostService = require('../service/post')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const dataPost = require('../factories/dataPost')
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
require('dotenv/config')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "tips",
  },
});

const upload = multer({ storage: storage });

function validValues(value) {
  if (value === '' || value === undefined || value === null) {
    return null
  }
  return value
}

router.post("/postLoadFile", upload.single("image"), async (req, res) => {
  return res.json({ filename: req.file.path });
});

router.post('/post', userAuth, async (req, res) => {
  let { title, description, tags, imgs } = req.body
  let user = req.data.id

  if( validValues(title) === null ||
      validValues(description) === null ) {
        res.statusCode = 400
        return res.json({error: 'Algum valor inválido'})
    }

  try {
    let newPost = dataPost.Build(await PostService.Create({ title, description, user, tags, imgs }))
    return res.json(newPost)
  } catch(error) {
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

  if( validValues(title) === null ||
      validValues(description) === null ) {
        res.statusCode = 400
        return res.json({error: 'Algum valor inválido'})
  }

  try {
    let postUpdate = dataPost.Build(await PostService.FindByIdAndUpdate(id,  {title, description, user, tags, imgs: newImgs}))
    return res.json(postUpdate)
  } catch(error) {
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
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.get('/maps', async (req, res) => {
  try {
    let maps = await PostService.findAvaliableMaps()
    return res.json({ maps })
  } catch(error) {
    res.statusCode = 500
    return res.json({error: 'Erro ao obter a listagem de mapas'})
  }
})

router.get('/agents/:map', async (req, res) => {
  try {
    let agents = await PostService.findAvaliableAgents(req.params.map)
    return res.json({ agents })
  } catch(error) {
    res.statusCode = 500
    return res.json({error: 'Erro ao obter a listagem de Agentes por mapa'})
  }
})

router.get('/posts', async (req, res) => {
  try {
    let posts = await PostService.FindAll()

    let postsFactories = []
    posts.forEach(post => {
      postsFactories.push(dataPost.Build(post))
    })

    return res.json({posts:postsFactories})
  } catch(error) {
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.get('/posts/:map/:agent', async (req, res) => {
  try {
    let { agent, map } = req.params

    let posts = await PostService.FindAllByMapAndAgent(agent, map)

    let postsFactories = []
    posts.forEach(post => {
      postsFactories.push(dataPost.Build(post))
    })

    return res.json({posts:postsFactories})
  } catch(error) {
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
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

module.exports = router
