import { IPost, Post } from '@/models/Post';
import { Suggestion } from '@/models/Suggestion';
import { User } from '@/models/User';
import { IView, View } from '@/models/View';

export type IDashboardServiceType = {
  countAll: number;
  countIps: number;
  countAllPosts: number;
  countAlMaps: number;
  countAlAgents: number;
  countAllSuggestions: number;
  countAllUsers: number;
};

export class DashboardService {
  async count(): Promise<IDashboardServiceType> {
    const countAllPosts: number = await Post.countDocuments({});
    const countAlMaps: IPost[] = await Post.find().distinct('tags.map');
    const countAlAgents: IPost[] = await Post.find().distinct('tags.agent');
    const countAllSuggestions: number = await Suggestion.countDocuments({});
    const countAllUsers: number = await User.countDocuments({});
    const count2: IView[] = await View.find().distinct('ip');
    const count: IView[] = await View.find();

    return {
      countAll: count.length,
      countIps: count2.length,
      countAllPosts,
      countAlMaps: countAlMaps.length,
      countAlAgents: countAlAgents.length,
      countAllSuggestions,
      countAllUsers,
    };
  }
}
