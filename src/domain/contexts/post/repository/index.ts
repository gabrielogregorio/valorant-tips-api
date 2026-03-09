import { RepositoryInterface } from '@/domain/contexts/common/repository/customRepository.interface';
import { PostEntity } from '../entity/post';

export interface PostRepositoryInterface extends RepositoryInterface<PostEntity> {
  save: (post: PostEntity) => Promise<PostEntity>;
  update: (post: PostEntity) => Promise<PostEntity>;
  findById: (id: string) => Promise<PostEntity | null>;
  findMapsInPosts: () => Promise<string[]>;
  findAll: (payload: { agent?: string; map?: string }) => Promise<PostEntity[]>;
  findAllByMapAndAgent: (agent: string, map: string) => Promise<PostEntity[]>;
  findAgentsByMapInPosts(map: string): Promise<string[]>;
  countAll: () => Promise<number>;
  findMaps: () => Promise<string[]>;
  findAgents: () => Promise<string[]>;
}
