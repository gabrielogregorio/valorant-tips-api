class DataUser {
  Build(user) {
    if (user === undefined) {
      return {}
    }

    return {
      _id: user._id.toString(),
      username: user.username,
      image: user.image
    }
  }
}

module.exports = new DataUser()
