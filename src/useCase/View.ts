import { IView } from '@/interfaces/view';
import { ViewsRepository, countViewsType } from '@/repositories/viewsRepository';

export class ViewService {
  private viewRepository: ViewsRepository;

  constructor(viewRepository: ViewsRepository) {
    this.viewRepository = viewRepository;
  }

  create = async (ip: string): Promise<IView> =>
    this.viewRepository.create({
      ip,
      dateAccess: new Date(),
    });

  countViews = async (): Promise<countViewsType> => {
    const count2 = await this.viewRepository.findAllDistinctIp().distinct('ip');
    const count = await this.viewRepository.findAll();
    const countAll = count.length;
    const countIps = count2.length;

    return { countAll, countIps };
  };
}
