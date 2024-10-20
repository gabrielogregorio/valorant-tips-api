import { ValidatorInterface } from '@/domain/common/validators/validator.interface';
import { ViewsEntity } from '@/domain/views/entity';
import ViewsYupValidator from '@/domain/views/validator/yup';

export class ViewsValidatorFactory {
  static create(): ValidatorInterface<ViewsEntity> {
    return new ViewsYupValidator();
  }
}
