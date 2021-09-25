const User = require('../models/User')

class UserService {
  async Create({username, password}) {
    let newUser = new User({username, password})
    await newUser.save()
    return newUser
  }

  async FindByIdAndUpdate(id, {username, password}) {
    let user = await User.findOneAndUpdate({_id: id}, {$set: {username, password}})
    return user
  }

  async FindById(id) {
    let user = await User.findById(id)
    return user
  }

  async FindByUsername(username) {
    let user = await User.find({username})
    if(user) {
      return user[0]
    } else {
      return user
    }
  }

  async DeleteById(id)   {
    let deleteuser = await User.findOneAndDelete({_id, id})
    return deleteuser
  }

}

module.exports = new UserService()
