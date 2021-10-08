require('dotenv/config')
const express = require('express')
const viewSerice = require('../service/View')
const router = express.Router()


router.post('/views', async (req, res) => {
  try {
    let ip = req.socket.remoteAddress.split(`:`).pop();
    await viewSerice.Create(ip)
    res.json({msg: 'ok'})
  } catch(error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

router.get('/views', async (req, res) => {
  try {
    let { countAll, countIps } = await viewSerice.CountViews()
    res.json({countAll, countIps})
  } catch(error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

module.exports = router
