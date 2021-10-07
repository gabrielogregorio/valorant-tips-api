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

  async FindAll(page) {
    let skip = 5
    let count = await Post.countDocuments({});

    let post = await Post.find({},null,
      {
        skip: page * skip,
        limit: skip,
        sort:{
          updatedAt: -1 //Sort by Date Added DESC
        }
      }
    ).populate('user')

    return {post, count: Math.ceil(count / skip)}
  }

  async FindAllByMapAndAgent(agent, map, page) {
    let skip = 5
    let count = await Post.countDocuments({ 'tags.agent': agent, 'tags.map': map });

    let post = await Post.find(
      {
        'tags.agent': agent,
        'tags.map': map
      },
      null,
      {
        skip:  page * skip,
        limit: skip,
        sort:{
          updatedAt: -1 //Sort by Date Added DESC
        }
      }).populate('user')
    return {post, count: Math.ceil(count / skip)}
  }

  async DeleteById(idPost, idUser)   {
    let deletePost = await Post.findOneAndDelete({_id: idPost})
    return deletePost
  }
}

module.exports = new PostService()
