
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

  async CountViews() {
    let count2 = await View.find().distinct('ip')
    let count = await View.find()
    let countAll = count.length
    let countIps = count2.length

    return {countAll, countIps}
  }
}

module.exports = new ViewService()

