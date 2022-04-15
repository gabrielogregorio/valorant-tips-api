/* eslint-disable no-underscore-dangle */
export class DataImgs {
  static Build(img) {
    return {
      id: img._id,
      description: img.description,
      image: img.image,
    };
  }
}
