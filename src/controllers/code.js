require('dotenv/config')
const express = require('express')
const CodeService = require('../service/Code')
const userAuth = require('../middlewares/userAuth')
const router = express.Router()

let tryCreateCode = 0

router.post('/generate_code', async(req, res) => {
  let { GENERATOR_CODE } = req.body;

  // Tentou criar o código duas vezes sem sucesso,
  // Servidor irá bloquear todas as novas tentativas
  if (tryCreateCode === 2) {
    return res.sendStatus(405)
  }

  if(GENERATOR_CODE === process.env.GENERATOR_CODE && GENERATOR_CODE.length > 15) {
    let codeGenerated = await CodeService.Create(GENERATOR_CODE)
    return res.json({code: codeGenerated.code})
  }
  tryCreateCode = tryCreateCode + 1
  return res.sendStatus(404)

})

module.exports = router
