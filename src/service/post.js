const Post = require('../models/Post')

class PostService {
  async Create({ title, description, user, tags, imgs }) {
    let newPost = new Post({ title, description, user, tags, imgs, user})
    await newPost.save()
    return newPost
  }

  async FindByIdAndUpdate(id,  { title, description, user, tags, imgs }) {
    let post = await Post.findOneAndUpdate({_id: id}, {$set:
      { title, description, user, tags, imgs }}, {new: true})
    return post
  }

  async FindById(id) {
    let post = await Post.findById(id).populate('user')
    return post
  }

  async findAvaliableMaps() {
      let maps = await Post.find().distinct('tags.map')
      return maps
  }

  async findAvaliableAgents(map) {
    let agents = await Post.find({'tags.map': map}).distinct('tags.agent')
    return agents
  }

  async FindAll() {
    let posts = await Post.find({}, null,
      {
        sort:{
          updatedAt: -1 //Sort by Date Added DESC
        }
      }
    ).populate('user')

    return posts
  }

  async FindAllByMapAndAgent(agent, map) {
    let posts = await Post.find({ 'tags.agent': agent, 'tags.map': map },
      null,
      { sort:{ updatedAt: -1 } }).populate('user')

    return posts
  }

  async DeleteById(idPost, idUser)   {
    let deletePost = await Post.findOneAndDelete({_id: idPost})
    return deletePost
  }
}

module.exports = new PostService()
