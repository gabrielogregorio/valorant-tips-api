import { CodeEntity } from '@/domain/code/entity';
import CodeYupValidator from '@/domain/code/validator/yup';
import { ValidatorInterface } from '@/domain/common/validators/validator.interface';

export class CodeValidatorFactory {
  static create(): ValidatorInterface<CodeEntity> {
    return new CodeYupValidator();
  }
}
