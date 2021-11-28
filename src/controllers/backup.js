require('dotenv/config')
const express = require('express')
const BackupService = require('../service/backup')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

router.get('/backup', userAuth, async (req, res) => {
  return res.json(await BackupService.start())
})

module.exports = router
