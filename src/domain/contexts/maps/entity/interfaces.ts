import { UniqueId } from '@/domain/contexts/common/utils/UniqueId';

export interface MapEntityInterface {
  changeName(name: string): void;
  changeImageUrl(name: string): void;

  readonly id: UniqueId;
  name: string;
  imageUrl: string;
}
