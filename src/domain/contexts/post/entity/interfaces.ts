import { UniqueId } from '@/domain/contexts/common/utils/UniqueId';
import { AgentsEntity } from '@/domain/contexts/contexts/agents/entity';
import { PostTagsValueObject } from '@/domain/contexts/contexts/postTags/valueObject';
import { UserEntity } from '@/domain/contexts/contexts/user/entity/user';
import { MapsEntity } from '../../maps/entity';
import { CreatePostStep } from './post';

export interface PostStepInterface {
  id: UniqueId;
  description: string;
  imageUrl: string;
}

export interface PostEntityInterface {
  delete(): void;
  unpublishPost(): void;
  publishPost(): void;

  changeTags(tags: PostTagsValueObject[]): void;
  changeSteps(steps: CreatePostStep[]): void;
  changeMap(map: MapsEntity[]): void;
  changeAgents(agents: AgentsEntity[]): void;
  changeAuthors(authors: UserEntity[]): void;
  changeDescription(description: string): void;
  changeTitle(title: string): void;

  readonly id: UniqueId;
  readonly createdAt: Date;

  updateAt: Date;
  title: string;
  description: string;
  isDeleted: boolean;
  isPublished: boolean;
  authors: UserEntity[];
  agents: AgentsEntity[];
  maps: MapsEntity[];
  tags: PostTagsValueObject[];
  steps: PostStepInterface[];
}
