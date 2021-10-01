const dataUser = require('./dataUser')

class DataPost {
  Build(post) {
    return {
      _id: post._id.toString(),
      title: post.title,
      description: post.description,
      user: dataUser.Build(post.user),
      tags: post.tags,
      imgs: post.imgs
    }
  }
}

module.exports = new DataPost()
