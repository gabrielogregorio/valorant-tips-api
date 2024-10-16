import { ValidatorInterface } from '../../common/validators/validator.interface';
import { CodeEntity } from '../enttity';
import CodeYupValidator from '../validator/yup';

export class CodeValidatorFactory {
  static create(): ValidatorInterface<CodeEntity> {
    return new CodeYupValidator();
  }
}
