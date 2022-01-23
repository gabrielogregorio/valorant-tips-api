const dataUser = require('./dataUser')
const dataImgs = require('./dataImgs')
class DataPost {
  Build(post) {
    let imgs = []
    for(let x = 0; x < post?.imgs?.length; x += 1) {
      imgs.push( dataImgs.Build(post?.imgs[x]))
    }

    return {
      id: post._id.toString(),
      title: post.title,
      description: post.description,
      user: dataUser.Build(post.user),
      tags: post.tags,
      imgs: imgs
    }
  }
}

module.exports = new DataPost()
