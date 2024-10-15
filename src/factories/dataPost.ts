import { DataUser, factoryUserType } from './dataUser';
import { DataImgs, factoryImgsType } from './dataImgs';

export type factoryPostType = {
  id: string;
  title: string;
  description: string;
  user: factoryUserType | null;
  tags: string;
  imgs: factoryImgsType[];
};

export class DataPost {
  static Build(post: any, options?: { returnUserId: boolean }): factoryPostType {
    const imgs: factoryImgsType[] = [];
    for (let x = 0; x < post?.imgs?.length; x += 1) {
      imgs.push(DataImgs.Build(post?.imgs[x]));
    }

    return {
      id: post?.id.toString(),
      title: post?.title,
      description: post?.description,
      user: post?.user ? DataUser.Build(post?.user, options) : null,
      tags: post?.tags,
      imgs,
    };
  }
}
