import { ViewsRepositoryInterface } from '../../../../domain/views/repository/inteface';
import { ViewsEntity } from '../../../../domain/views/enttity';
import { View } from './View';

export type countViewsType = {
  countAll: number;
  countIps: number;
};

export class ViewsRepository implements ViewsRepositoryInterface {
  save = async (view: ViewsEntity): Promise<ViewsEntity> => {
    const newView = new View({
      dateAccess: view.dateAccess,
      ip: view.ip,
    });
    await newView.save();
    return new ViewsEntity({
      dateAccess: newView.dateAccess,
      ip: newView.ip,
    });
  };

  findAll = async (): Promise<ViewsEntity[]> => {
    const views = await View.find();

    return views.map((item) => new ViewsEntity({ dateAccess: item.dateAccess, ip: item.ip }));
  };

  findAllDistinctIp = async () => {
    // etennder o que retorna aqui
    const views = await View.find().distinct('ip');
    return views;
  };
}
