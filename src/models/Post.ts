import mongoose from 'mongoose';
import { IPost } from 'src/interfaces/post';

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
