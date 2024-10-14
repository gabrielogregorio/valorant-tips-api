import { RepositoryInterface } from "src/domain/@shared/repository/customRepository.interface";
import { PostEntity } from "../entity/post";

export interface PostAggregateRepositoryInterface extends RepositoryInterface<PostEntity> {}

