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
    let skip = 10
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

    return {post, count: Math.ceil(count / skip), tags: []}
  }


  /* Recive posts [{_id: '123', tags: [moment: 'aa', side: 'bb']}] => return ['aa', 'bb'] */
  getAllTags(posts) {
    let tags = []
    try {
      for(let x = 0; x < posts.length; x++) {
        let keys = Object.keys(posts[x].tags)

        for(let i = 0; i < keys.length; i++) {
          if(!tags.includes(posts[x].tags[keys[i]])) {
            if(keys[i] !== 'map' && keys[i] !== 'agent') {
              if(posts[x].tags[keys[i]] !== undefined) {
                tags.push(posts[x].tags[keys[i]])
              }
            }
          }
        }
      }
    } catch(error) {
      console.log(error)
    }
    return tags
  }

  /* Recive posts [{_id: '123', tags: [moment: 'aa', side: 'bb']}] => return ['aa', 'bb']
  filters: [''] */
  FilterPosts(posts, filters) {
    let filterPosts = []

    if(filters.length === 0) {
      return posts
    }

    for(let x = 0; x < posts.length; x++) {
      let keys = Object.keys(posts[x].tags)
      let countFilters = 0

      for(let i = 0; i < keys.length; i++) {
        let valueTag = posts[x].tags[keys[i]]

        if( filters.includes(valueTag) ) {
          countFilters++
          // Se tem todos os filtros
          if(countFilters === filters.length) {
            filterPosts.push(posts[x])
          }
        }
      }
    }

    return filterPosts
  }

  async FindAllByMapAndAgent(agent, map, page, filters) {
    let skip = 10
    let posts = await Post.find({ 'tags.agent': agent, 'tags.map': map },
      null,
      { sort:{ updatedAt: -1 } }).populate('user')

    let tags = await this.getAllTags(posts)

    posts = await this.FilterPosts(posts, filters)

    let count = posts.length


    return {
      post: posts.slice(page * skip, page * skip + skip),
      tags,
      count: Math.ceil(count / skip)}
  }

  async DeleteById(idPost, idUser)   {
    let deletePost = await Post.findOneAndDelete({_id: idPost})
    return deletePost
  }
}

module.exports = new PostService()
