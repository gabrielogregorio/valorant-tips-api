const Report = require('../models/Report')

class ReportService {
  async Create({post_id, email, description, screenHeight, screenWidth}) {
    let newReport = new Report({
      post_id,
      email,
      description,
      screenHeight: parseInt(screenHeight),
      screenWidth: parseInt(screenWidth),
    })
    await newReport.save()
    return newReport
  }

  async FindAdll() {
    let reports = await Report.find()
    return reports
  }

  async UpdateById(_id, status) {
    let reportNew = await Report.findOneAndUpdate({_id}, {$set: {status}}, {new: true})
    return reportNew
  }

  async DeleteById(_id) {
    let deleteReport = await Report.findOneAndDelete({_id})
    return deleteReport
  }
}

module.exports = new ReportService()
