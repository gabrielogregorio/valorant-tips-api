require('dotenv/config')
const express = require('express')
const UserService = require('../service/user')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const bcrypt = require('bcrypt')

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

  jwt.sign({username, name:user.name, id: user._id}, jwtSecret, {expiresIn: '48h'}, (error, token) => {
    if (error) {
      return res.sendStatus(500)
    }
    return res.json({token, id: user._id})
  })
})

router.post('/user', async (req, res) => {
  let { username, password } = req.body

  if  (
    (username === undefined || username === null || username === '') ||
    (password === undefined || password === null || password === '')
  ) {
    return res.sendStatus(400)
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)

  try {
    let newUser = await UserService.Create({username, password:hash})
    return res.json(newUser)
  } catch(error) {
    res.status = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.put('/user', userAuth, async (req, res) => {
  let { username, password } = req.body
  let { id } = req.data

  try {
    let userUpdate = await UserService.FindByIdAndUpdate(id, {username, password})
    return res.json(userUpdate)
  } catch(error) {
    res.status = 500
    return res.json({error: 'Erro no servidor'})
  }
})

router.get('/user', userAuth, async (req, res) => {
  let { id } = req.data

  try {
    let newUser = await UserService.FindById(id)
    return res.json(newUser)
  } catch(error) {
    res.status = 500
    return res.json({error: 'Erro no servidor'})
  }
})


router.delete('/user', userAuth, async (req, res) => {
  let { id } = req.data

  try {
    await UserService.DeleteById(id)
    return res.sendStatus(200)
  } catch(error) {
    res.status = 500
    return res.json({error: 'Erro no servidor'})
  }
})

module.exports = router
