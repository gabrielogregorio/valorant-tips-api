require('dotenv/config')
const { bucket } = require('./bucket')
const { format } = require('util');
const Multer = require('multer')
const multer_post = require('../middlewares/multerPost')
const multer = Multer({
  storage: Multer.memoryStorage(),
  limits: {
    fileSize: 0.9 * 1024 * 1024 // 5mb
  }
})
console.log(process.env.MODE_RUN)
if (process.env.MODE_RUN === 'PRODUCTION') {
  module.exports = { bucket, format, Multer, multer }
} else if(process.env.MODE_RUN === 'DEVELOP') {
  console.log('dev')
  module.exports = { bucket:null, format:null, Multer:null, multer: multer_post }
}

