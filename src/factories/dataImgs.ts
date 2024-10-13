export type factoryImgsType = {
  id: string;
  description: string;
  image: string;
};

export class DataImgs {
  static Build(img: any): factoryImgsType {
    return {
      id: img?._id,
      description: img?.description,
      image: img?.image,
    };
  }
}
