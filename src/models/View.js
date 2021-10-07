const mongoose = require('mongoose')

const viewSchema = new mongoose.Schema({
  ip: String,
  dateAcess: Date, //para evitar DDOS no futuro
}, {
  timestamps: true
})

const View = mongoose.model('View', viewSchema)

module.exports = View
