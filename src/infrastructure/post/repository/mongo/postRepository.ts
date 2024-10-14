import { IPost } from '@/interfaces/post';
import { PostEntity } from '../../../../domain/post/entity/post';
import { PostAggregateRepositoryInterface } from '../../../../domain/post/repository/postRepository.interface';
import { Post } from './Post';

export class PostInfraRepository implements PostAggregateRepositoryInterface {
  create = async (post: PostEntity): Promise<void> => {
    const newPost = new Post({
      description: post.description,
      imgs: post.imgs,
      tags: post.tags,
      title: post.title,
      user: post.userId,
      _id: post.id,
    });
    await newPost.save();
  };

  findByIdAndUpdate = async (id: string, post: Partial<IPost>): Promise<IPost | null> =>
    Post.findOneAndUpdate({ _id: id }, { $set: { ...post } }, { new: true }).populate('user');

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
