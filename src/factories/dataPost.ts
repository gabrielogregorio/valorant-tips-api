/* eslint-disable no-underscore-dangle */
import { DataUser } from './dataUser';
import { DataImgs } from './dataImgs';

export class DataPost {
  static Build(post) {
    const imgs = [];
    for (let x = 0; x < post?.imgs?.length; x += 1) {
      imgs.push(DataImgs.Build(post?.imgs[x]));
    }

    return {
      id: post._id.toString(),
      title: post.title,
      description: post.description,
      user: DataUser.Build(post.user),
      tags: post.tags,
      imgs,
    };
  }
}
