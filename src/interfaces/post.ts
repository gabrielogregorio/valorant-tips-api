import mongoose from 'mongoose';

export interface IImagePost {
  _id: string;
  description: string;
  image: string;
}

export interface IPost {
  title: string;
  description: string;
  user: mongoose.Schema.Types.ObjectId;
  tags: {
    moment: string;
    difficult: string;
    ability: string;
    side: string;
    map: string;
    mapPosition: string;
    agent: string;
  };
  imgs: IImagePost[];
}
