const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
  post_id: String,
  email: String,
  description: String,
  screenHeight: Number,
  screenWidth: Number,
  status: String
}, {
  timestamps: true
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report
