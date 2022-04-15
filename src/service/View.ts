import { View, IView } from '@/models/View';

type countViewsType = {
  countAll: number;
  countIps: number;
};

export class ViewService {
  static async Create(ip: string): Promise<IView> {
    const newView = new View({
      ip,
      dateAcess: Date.now(),
    });
    await newView.save();
    return newView;
  }

  static async CountViews(): Promise<countViewsType> {
    const count2 = await View.find().distinct('ip');
    const count = await View.find();
    const countAll = count.length;
    const countIps = count2.length;

    return { countAll, countIps };
  }
}
