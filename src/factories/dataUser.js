class DataUser {
  Build(user) {
    if (!user) {
      return {}
    }

    return {
      username: user.username,
      image: user.image
    }
  }
}

module.exports = new DataUser()
