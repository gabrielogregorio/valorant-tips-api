
const View = require('../models/View')

class ViewService {
  async Create(ip) {
    let newView = new View({
      ip,
      dateAcess: Date.now()
    })
    await newView.save()
    return newView
  }
}

module.exports = new ViewService()

