require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

mongoose.connect(
  process.env.MONGO_URI, {}
).then(() => {}).catch(error => console.log(error))

app.get('/', (req, res) => {
  return res.send('oi')
})

module.exports = { app, mongoose }
