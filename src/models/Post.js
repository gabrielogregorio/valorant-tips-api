const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  id: String,
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: {
    moment: String,
    difficult: String,
    ability: String,
    side: String,
    map: String,
    mapPosition: String,
    agent: String,
  },
  imgs: [
    {
      title: String,
      img: String
    }
  ]
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post
