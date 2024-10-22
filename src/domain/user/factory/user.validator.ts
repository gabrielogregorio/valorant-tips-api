import { ValidatorInterface } from '@/domain/common/validators/validator.interface';
import { UserEntity } from '@/domain/user/entity/user';
import UserYupValidator from '@/domain/user/validator/user.yup';

export class UserValidatorFactory {
  static create(): ValidatorInterface<UserEntity> {
    return new UserYupValidator();
  }
}
