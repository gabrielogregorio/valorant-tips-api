class DataUser {
  Build(user) {
    if (!user) {
      return {}
    }

    return {
      id: user._id.toString(),
      username: user.username,
      image: user.image
    }
  }
}

module.exports = new DataUser()
