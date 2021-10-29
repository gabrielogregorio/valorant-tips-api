const Post = require('../models/Post')
const Suggestion = require('../models/Sugestion')
const User = require('../models/User')
const View = require('../models/View')

class DashboardService {

  async count() {
    let countAllPosts = await Post.countDocuments({});
    let countAlMaps = await Post.find().distinct('tags.map');
    let countAlAgents = await Post.find().distinct('tags.agent')
    let countAllSuggestions = await Suggestion.countDocuments({});
    let countAllUsers = await User.countDocuments({});
    let count2 = await View.find().distinct('ip')
    let count = await View.find()
    let countAll = count.length
    let countIps = count2.length

    return {countAll, countIps, countAllPosts, countAlMaps: countAlMaps.length ,countAlAgents: countAlAgents.length, countAllSuggestions, countAllUsers}
  }

}

module.exports = new DashboardService()
