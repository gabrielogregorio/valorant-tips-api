import { Post, IPost } from '@/models/Post';

export class PostService {
  static async Create({ title, description, user, tags, imgs }: IPost): Promise<IPost> {
    const newPost = new Post({ title, description, user, tags, imgs });
    await newPost.save();
    return newPost;
  }

  static async FindByIdAndUpdate(id: string, { title, description, user, tags, imgs }: IPost): Promise<IPost> {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      { $set: { title, description, user, tags, imgs } },
      { new: true },
    );
    return post;
  }

  static async FindById(id: string): Promise<IPost> {
    const post = await Post.findById(id).populate('user');
    return post;
  }

  static async findAvaliableMaps(): Promise<string[]> {
    const maps = await Post.find().distinct('tags.map');
    return maps;
  }

  static async findAvaliableAgents(map: string): Promise<string[]> {
    const agents = await Post.find({ 'tags.map': map }).distinct('tags.agent');
    return agents;
  }

  static async FindAll(): Promise<IPost[]> {
    const posts = await Post.find({}, null, {
      sort: {
        updatedAt: -1,
      },
    }).populate('user');

    return posts;
  }

  static async FindAllByMapAndAgent(agent: string, map: string): Promise<IPost[]> {
    const posts = await Post.find({ 'tags.agent': agent, 'tags.map': map }, null, { sort: { updatedAt: -1 } }).populate(
      'user',
    );

    return posts;
  }

  static async DeleteById(idPost: string): Promise<any> {
    const deletePost = await Post.findOneAndDelete({ _id: idPost });
    return deletePost;
  }
}
