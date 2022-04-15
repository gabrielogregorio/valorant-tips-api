import { Post } from '@/models/Post';
import { Suggestion } from '@/models/Suggestion';
import { User } from '@/models/User';
import { mockDevEnvironment } from '@/mock/mock_dev';

export class DevEnvironmentService {
  static async Create() {
    const mock = mockDevEnvironment;
    mock.user.forEach((user) => {
      new User(user).save();
    });

    mock.suggestion.forEach((suggestion) => {
      new Suggestion(suggestion).save();
    });

    mock.post.forEach((post) => {
      new Post(post).save();
    });
  }
}
