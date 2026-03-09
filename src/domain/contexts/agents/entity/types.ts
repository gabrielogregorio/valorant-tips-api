import { UniqueId } from '@/domain/contexts/common/utils/UniqueId';

export interface AgentsEntityInterface {
  readonly id: UniqueId;
  name: string;
  imageUrl: string;

  changeImageUrl(newImageUrl: string): void;
  changeName(newName: string): void;
}
