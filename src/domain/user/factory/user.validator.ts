import { ValidatorInterface } from '../../@shared/validators/validator.interface';
import { UserEntity } from '../entity/user';
import UserYupValidator from '../validator/user.yup';

export class UserValidatorFactory {
  static create(): ValidatorInterface<UserEntity> {
    return new UserYupValidator();
  }
}
