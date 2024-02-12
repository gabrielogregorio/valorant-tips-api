import { IView } from '@/interfaces/view';
import { ViewRepository, countViewsType } from '@/repositories/viewRepository';

export class ViewService {
  private viewRepository: ViewRepository;

  constructor(viewRepository: ViewRepository) {
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
