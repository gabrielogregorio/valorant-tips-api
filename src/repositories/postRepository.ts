/* eslint-disable import/no-restricted-paths */
import { IPost } from '@/interfaces/post';
import { Post } from '@/models/Post';

export class PostRepository {
  create = async (post: IPost): Promise<IPost> => {
    const newPost = new Post(post);
    await newPost.save();
    return newPost;
  };

  findByIdAndUpdate = async (id: string, post: IPost): Promise<IPost | null> =>
    Post.findOneAndUpdate({ _id: id }, { $set: { post } }, { new: true });

  findById = async (id: string): Promise<IPost | null> => Post.findById(id).populate('user');

  findAvailableMaps = async (): Promise<string[]> => Post.find().distinct('tags.map');

  findAvailableAgents = async (map: string): Promise<string[]> => Post.find({ 'tags.map': map }).distinct('tags.agent');

  findAll = async (): Promise<IPost[]> =>
    Post.find({}, null, {
      sort: {
        updatedAt: -1,
      },
    }).populate('user');

  findAllByMapAndAgent = async (agent: string, map: string): Promise<IPost[]> =>
    Post.find({ 'tags.agent': agent, 'tags.map': map }, null, { sort: { updatedAt: -1 } }).populate('user');

  deleteById = async (id: string): Promise<any> => Post.findOneAndDelete({ _id: id });

  countAll = async (): Promise<any> => Post.countDocuments({});

  findMaps = async (): Promise<any> => Post.find().distinct('tags.map');

  findAgents = async (): Promise<any> => Post.find().distinct('tags.agent');
}
