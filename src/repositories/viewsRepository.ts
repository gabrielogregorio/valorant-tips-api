/* eslint-disable import/no-restricted-paths */
import { IView } from '@/interfaces/view';
import { View } from '@/models/View';

export type countViewsType = {
  countAll: number;
  countIps: number;
};

export class ViewsRepository {
  create = async (view: IView): Promise<IView> => {
    const newView = new View(view);
    await newView.save();
    return newView;
  };

  findAll = () => View.find();

  findAllDistinctIp = () => View.find().distinct('ip');
}
