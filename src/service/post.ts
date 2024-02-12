import { Post, IPost } from '@/models/Post';

export class PostService {
  async Create({ title, description, user, tags, imgs }: IPost): Promise<IPost> {
    const newPost = new Post({ title, description, user, tags, imgs });
    await newPost.save();
    return newPost;
  }

  async FindByIdAndUpdate(id: string, { title, description, user, tags, imgs }: IPost): Promise<IPost> {
    return Post.findOneAndUpdate({ _id: id }, { $set: { title, description, user, tags, imgs } }, { new: true });
  }

  async FindById(id: string): Promise<IPost> {
    return Post.findById(id).populate('user');
  }

  async findAvailableMaps(): Promise<string[]> {
    const maps: string[] = await Post.find().distinct('tags.map');
    return maps;
  }

  async findAvailableAgents(map: string): Promise<string[]> {
    return Post.find({ 'tags.map': map }).distinct('tags.agent');
  }

  async FindAll(): Promise<IPost[]> {
    const posts = await Post.find({}, null, {
      sort: {
        updatedAt: -1,
      },
    }).populate('user');

    return posts;
  }

  async FindAllByMapAndAgent(agent: string, map: string): Promise<IPost[]> {
    return Post.find({ 'tags.agent': agent, 'tags.map': map }, null, { sort: { updatedAt: -1 } }).populate('user');
  }

  async DeleteById(idPost: string): Promise<any> {
    return Post.findOneAndDelete({ _id: idPost });
  }
}
