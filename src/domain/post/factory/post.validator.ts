import { ValidatorInterface } from '@/domain/common/validators/validator.interface';
import { PostEntity } from '@/domain/post/entity/post';
import PostYupValidator from '@/domain/post/validator/post.yup';

export class PostValidatorFactory {
  static create(): ValidatorInterface<PostEntity> {
    return new PostYupValidator();
  }
}
