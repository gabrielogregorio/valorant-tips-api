import { Post } from '@/models/Post';
import { Suggestion } from '@/models/Sugestion';
import { User } from '@/models/User';
import { View } from '@/models/View';

export class DashboardService {
  static async count() {
    const countAllPosts = await Post.countDocuments({});
    const countAlMaps = await Post.find().distinct('tags.map');
    const countAlAgents = await Post.find().distinct('tags.agent');
    const countAllSuggestions = await Suggestion.countDocuments({});
    const countAllUsers = await User.countDocuments({});
    const count2 = await View.find().distinct('ip');
    const count = await View.find();
    const countAll = count.length;
    const countIps = count2.length;

    return {
      countAll,
      countIps,
      countAllPosts,
      countAlMaps: countAlMaps.length,
      countAlAgents: countAlAgents.length,
      countAllSuggestions,
      countAllUsers,
    };
  }
}
