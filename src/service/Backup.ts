import dotenv from 'dotenv';
import { Post } from '@/models/Post';
import { Suggestion } from '@/models/Sugestion';

dotenv.config();

export class BackupService {
  static async start() {
    const post = await Post.find();
    const suggestion = await Suggestion.find();

    return {
      post,
      suggestion,
    };
  }
}
