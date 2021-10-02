const mongoose = require('mongoose')

const codeSchema = new mongoose.Schema({
  code: String,
  available: Boolean,
}, {
  timestamps: true
})

const Code = mongoose.model('Code', codeSchema)

module.exports = Code
