class DataImgs{
  Build(img) {
    return {
      id: img._id,
      description: img.description,
      image: img.image,
    }
  }
}

module.exports = new DataImgs()
