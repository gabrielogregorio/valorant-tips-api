const mongoose = require('mongoose')

const suggestionSchema = new mongoose.Schema({
  post_id: String,
  email: String,
  description: String,
  status: String
}, {
  timestamps: true
})

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

module.exports = Suggestion
