require('dotenv/config')
const express = require('express')
const DevEnvironment = require('../service/DevEnvironment')
const router = express.Router()

router.get('/prepare_dev_environment', async (req, res) => {
  if(process.env.MODE_RUN === 'DEVELOP') {
    await DevEnvironment.Create()
    return res.json({msg: 'Environment create success'})
  }

  return res.json({msg: 'Sério que você achou que eu não tinha pensado nisso meu filho!'})
})


module.exports = router
