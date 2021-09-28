require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const UserController = require('../src/controllers/user')
const PostController = require('../src/controllers/post')
const cors = require('cors')

const app = express()


app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(express.static('public'))

// Controllers
app.use('/', UserController)
app.use('/', PostController)

mongoose.connect(
  process.env.MONGO_URI, {}
).then(() => {}).catch(error => console.log(error))

app.get('/', (req, res) => {
  return res.send('oi')
})

module.exports = { app, mongoose }
