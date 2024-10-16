import mongoose from 'mongoose';
import { IPost } from 'src/interfaces/post';

const postSchema = new mongoose.Schema<IPost>(
  {
    id: {
      type: String,
      unique: true,
    },
    title: String,
    description: String,
    userId: String,
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
        id: String,
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
