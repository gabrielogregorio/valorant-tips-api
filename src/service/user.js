const User = require('../models/User')

class UserService {
  async Create({username, password}) {
    let newUser = new User({username, password})
    await newUser.save()
    return newUser
  }

  async FindByIdAndUpdate(id, {username, password}) {
    let update = {}
    // Senha foi alterada
    if(password !== '' && password !== undefined && password !== null) {
      update.password = password
    }
    // Username foi alterado
    if(username !== '' && username !== undefined && username !== null) {
      update.username = username
    }

    let user = await User.findOneAndUpdate({_id: id}, {$set: update})
    return user
  }

  async FindById(id) {
    let user = await User.findById(id)
    return user
  }

  async UserExistsByUsername(username, id) {
    let user = await User.findOne({username})

    if(user === null) {
      return undefined
    } else {
      if(user._id.toString() === id) {
        return undefined
      } else {
        return user
      }
    }
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
    let deleteuser = await User.findOneAndDelete({_id: id})
    return deleteuser
  }

}

module.exports = new UserService()
