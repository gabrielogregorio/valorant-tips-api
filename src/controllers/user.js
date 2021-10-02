require('dotenv/config')
const express = require('express')
const UserService = require('../service/user')
const CodeService = require('../service/Code')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const bcrypt = require('bcrypt')
const dataUser = require('../factories/dataUser')
const multer_user = require('../middlewares/multerUser')

router.post('/userLoadFile', multer_user.single('image'), async(req, res, next) => {
  //let user = processId(req.data.id)
  let filename = ''

  if (!req.file){ // || user === undefined) {
    res.status(400).send('No file uploaded.');

    return;
  }

  if (req.file) {
    filename = req.file['filename']
  } else {
    filename = ''
  }
  return res.json({filename})

  //const blob = bucket.file(`${Date.now().toString()}-${uuid()}`);
  //const blobStream = blob.createWriteStream();

  //blobStream.on('error', err => {
  //  next(err);
  //});

  //blobStream.on('finish', () => {
  //  const publicUrl = format(
  //   `https://storage.googleapis.com/${bucket.name}/${blob.name}`
  //  );
  //  res.json({file:publicUrl})
  //});
  //blobStream.end(req.file.buffer);
})

router.post('/auth', async (req, res) => {
  let {username, password} = req.body;

  let user = await UserService.FindByUsername(username)

  if(user === undefined) {
    return res.sendStatus(404)
  }

  let valid = await bcrypt.compare(password, user.password);
  if(!valid) {
    return res.sendStatus(403)
  }

  jwt.sign({username, name:user.name, id: user._id}, jwtSecret, {expiresIn: '128h'}, (error, token) => {
    if (error) {
      return res.sendStatus(500)
    }
    return res.json({token, id: user._id})
  })
})

router.post('/user', async (req, res) => {
  let { username, password, image, code } = req.body

  let codeData = await CodeService.FindCode(code)

  if (codeData?.code?.length < 10 || codeData === null) {
    res.statusCode = (403)
    return res.json({msg: 'invalid code'})
  }

  if  (
    (username === undefined || username === null || username === '') ||
    (password === undefined || password === null || password === '')
  ) {
    return res.sendStatus(400)
  }

  // Verifica se o username já está registrado
  let userExists = await UserService.UserExistsByUsername(username, "")
  if(userExists !== undefined) {
    res.statusCode = 409
    return res.json({error: 'Username já está cadastrado!'})
  }

  // Gera um hash da senha
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  let update = {username, password:hash}
  if(image !== undefined && image !== '') {
    update.image = image
  }

  try {
    let use = await CodeService.UseCode(codeData.code)
    if(use.available !== false) {
      return res.sendStatus(403)
    }

    let newUser = dataUser.Build(await UserService.Create(update))
    return res.json(newUser)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.put('/user', userAuth, async (req, res) => {
  let { username, password, image } = req.body
  let { id } = req.data

  // Se o Usuário foi alterado, verificar se já existe no db
  if(username !== '' && username !== undefined && username !== null) {
    let userExists = await UserService.UserExistsByUsername(username, id)

    if(userExists !== undefined) {
      res.statusCode = 409
      return res.json({error: 'Username já está cadastrado!'})
    }
  }

  if(password !== '' && password !== undefined && password !== null) {
    const salt = await bcrypt.genSalt(10)
    password = await bcrypt.hash(password, salt) // Hash
  } else {
    password = undefined
  }

  let update = {username, password}
  if(image !== undefined && image !== '') {
    update.image = image
  }

  try {
    let userUpdate = dataUser.Build(await UserService.FindByIdAndUpdate(id, update))
    return res.json(userUpdate)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.get('/user', userAuth, async (req, res) => {
  let { id } = req.data

  try {
    let newUser = dataUser.Build(await UserService.FindById(id))
    return res.json(newUser)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.delete('/user', userAuth, async (req, res) => {
  let { id } = req.data

  try {
    await UserService.DeleteById(id)
    return res.json({})
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no servidor'})
  }
})

module.exports = router
