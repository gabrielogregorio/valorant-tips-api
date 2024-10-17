import { ValidatorInterface } from '../../common/validators/validator.interface';
import { PostEntity } from '../entity/post';
import PostYupValidator from '../validator/post.yup';

export class PostValidatorFactory {
  static create(): ValidatorInterface<PostEntity> {
    return new PostYupValidator();
  }
}
