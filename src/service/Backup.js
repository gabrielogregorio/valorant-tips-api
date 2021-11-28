require('dotenv/config')
const Post = require('../models/Post')
const Report = require('../models/Report')
const Suggestion = require('../models/Sugestion')

class BackupService {
  async start() {
    let post = await Post.find()
    let report = await Report.find()
    let suggestion = await Suggestion.find()

    return {
      post,
      report,
      suggestion
    }
  }
}

module.exports = new BackupService()
