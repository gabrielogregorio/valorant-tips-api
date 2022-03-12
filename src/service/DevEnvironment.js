const Post = require('../models/Post')
const Suggestion= require('../models/Sugestion')
const mockDevEnvironment = require('../../mock/mock_dev')
const User = require('../models/User')

class DevEnvironmentService {
  async Create() {
    const mock = mockDevEnvironment.mockDevEnvironment
    mock.user.forEach(user => {
      new User(user).save()
    })

    mock.suggestion.forEach(suggestion => {
      new Suggestion(suggestion).save()
    })

    mock.post.forEach(post => {
      new Post(post).save()
    })
  }
}

module.exports = new DevEnvironmentService()
