const Post = require('../models/Post')

class PostService {
  async Create({ title, description, user, tags, imgs }) {
    let newPost = new Post({ title, description, user, tags, imgs })
    await newPost.save()
    return newPost
  }

  async FindByIdAndUpdate(id,  { title, description, user, tags, imgs }) {
    let post = await Post.findOneAndUpdate({_id: id}, {$set:
      { title, description, user, tags, imgs }}, {new: true})
    return post
  }

  async FindById(id) {
    let post = await Post.findById(id)
    return post
  }

  async DeleteById(idPost, idUser)   {
    let deletePost = await Post.findOneAndDelete({_id: idPost, user:idUser})
    return deletePost
  }

}

module.exports = new PostService()
