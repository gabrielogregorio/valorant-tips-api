import { RepositoryInterface } from 'src/domain/@shared/repository/customRepository.interface';
import { UserEntity } from '../entity/user';

export interface UserRepositoryInterface extends RepositoryInterface<UserEntity> {
  update: (id: string, user: UserEntity) => Promise<void>;
  findById: (id: string) => Promise<UserEntity | null>;
  findByIds:(id: string[])=> Promise<UserEntity[]>;
  findOneByUsername: (username: string) => Promise<UserEntity | null>;
  findOneAndDelete: (id: string) => Promise<void>;
  countDocuments: () => Promise<number>;
}
