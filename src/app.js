require('dotenv/config')
const express = require('express')
const mongoose = require('mongoose')
const UserController = require('../src/controllers/user')
const PostController = require('../src/controllers/post')
const SuggestionController = require('../src/controllers/suggestion')
const ReportController = require('../src/controllers/report')
const CodeController = require('./controllers/code')
const ViewsController = require('./controllers/views')
const DashboardController = require('./controllers/dashboard')
//const BackupController = require('./controllers/backup')
//const DevEnvironmentController = require('./controllers/DevEnvironment')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(express.static('public'))

// Controllers
app.use('/', UserController)
app.use('/', PostController)
app.use('/', SuggestionController)
app.use('/', ReportController)
app.use('/', CodeController)
app.use('/', ViewsController)
app.use('/', DashboardController)
//app.use('/', BackupController)
//app.use('/', DevEnvironmentController)

mongoose.connect(
  process.env.MONGO_URI, {}
).then(() => {}).catch(error => console.log(error))

app.get('/', (req, res) => {
  return res.send('oi')
})

module.exports = { app, mongoose }
