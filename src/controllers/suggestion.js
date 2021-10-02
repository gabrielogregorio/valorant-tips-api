require('dotenv/config')
const express = require('express')
const SuggestionService = require('../service/suggestion')
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

// Qualquer pessoa pode criar uma sugestão
// Mesmo sem ter uma conta
router.post('/suggestion', async(req, res) => {
  let { post_id, email, description} = req.body

  if(description === null || description === undefined || description === '') {
    res.statusCode = 400
    return res.json({erro: 'Parametros inválidos ou faltantes'})
  }

  let suggestion = await SuggestionService.Create({
    post_id,
    email,
    description
  })

  return res.json(suggestion)
})

router.get('/suggestions', userAuth, async (req, res) => {
  let suggestions = await SuggestionService.FindAdll()
  return res.json(suggestions)
})

router.put('/suggestion/:id', userAuth, async (req, res) => {
  const suggestionId = req.params.id
  const newStatus = req.body.status

  if(newStatus !== 'accepted' && newStatus !== 'rejected') {
    res.statusCode = 400
    return res.json({error: 'Status para a sugestão inválido!'})
  }

  try {
    let suggestionEdited = await SuggestionService.UpdateById(suggestionId, newStatus)
    return res.json(suggestionEdited)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({msg: 'Erro no Servidor'})
  }
})


router.delete('/suggestion/:id', userAuth, async (req, res) => {
  const suggestionId = req.params.id

  try {
    await SuggestionService.DeleteById(suggestionId)
    return res.json({})
  } catch(error) {
    res.statusCode = 500
    return res.json({msg: 'Erro no Servidor'})
  }
})

module.exports = router
