import mongoose from 'mongoose';

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
  imgs: {
    _id: string;
    description: string;
    image: string;
  }[];
}

const postSchema = new mongoose.Schema<IPost>(
  {
    title: String,
    description: String,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    tags: {
      moment: String,
      difficult: String,
      ability: String,
      side: String,
      map: String,
      mapPosition: String,
      agent: String,
    },
    imgs: [
      {
        _id: String,
        description: String,
        image: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const Post = mongoose.model<IPost>('Post', postSchema);
