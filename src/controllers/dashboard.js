require('dotenv/config')
const express = require('express')
const DashboardService = require('../service/dashboard')
const router = express.Router()
const userAuth = require('../middlewares/userAuth')

router.get('/dashboard', userAuth, async (req, res) => {
  try {
    let data = await DashboardService.count()
    return res.json(data)
  } catch(error) {
    console.log(error)
    return res.sendStatus(500)
  }
})

module.exports = router
