require('dotenv/config')
const express = require('express')
const ReportService = require('../service/report')
const userAuth = require('../middlewares/userAuth')

const router = express.Router()

// Qualquer pessoa pode criar uma sugestão
// Mesmo sem ter uma conta
router.post('/report', async(req, res) => {
  let { post_id, email, description, screenHeight, screenWidth } = req.body

  if(description === null || description === undefined || description === '') {
    res.statusCode = 400
    return res.json({erro: 'Parametros inválidos ou faltantes'})
  }

  if (!screenHeight || !screenWidth) {
    screenHeight = 0
    screenWidth = 0
  }

  try {
    let report = await ReportService.Create({
      post_id,
      email,
      description,
      screenHeight,
      screenWidth
    })
    return res.json(report)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no Servidor'})
  }
})

router.get('/reports', userAuth, async (req, res) => {
  try {
    let reports = await ReportService.FindAdll()
    return res.json(reports)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({error: 'Erro no Servidor'})
  }
})

router.put('/report/:id', userAuth, async (req, res) => {
  const reportId = req.params.id
  const newStatus = req.body.status

  if(newStatus !== 'accepted' && newStatus !== 'rejected') {
    res.statusCode = 400
    return res.json({error: 'Status para o report inválido!'})
  }

  try {
    let reportEdited = await ReportService.UpdateById(reportId, newStatus)
    return res.json(reportEdited)
  } catch(error) {
    console.log(error)
    res.statusCode = 500
    return res.json({msg: 'Erro no Servidor'})
  }
})

router.delete('/report/:id', userAuth, async (req, res) => {
  const reportId = req.params.id

  try {
    await ReportService.DeleteById(reportId)
    return res.json({})
  } catch(error) {
    res.statusCode = 500
    return res.json({msg: 'Erro no Servidor'})
  }
})

module.exports = router
