const mongoose = require('mongoose')

// Por enquanto as tags serão controladas pelo frontend, mas futuramente deverá
// ser criado um objeto ou coleção para controlar esse aspecto no frontend e no
// backend
const postSchema = mongoose.Schema({
  title: String,
  description: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: {
    moment: [String],
    difficult: [String],
    ability: [String],
    side: [String],
    map: [String],
    mapPosition: [String],
    agent: [String],
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
