import { Post } from '@/models/Post';
import { Suggestion } from '@/models/Suggestion';

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
