import { ValidatorInterface } from '../../@shared/validators/validator.interface';
import { ViewsEntity } from '../enttity';
import ViewsYupValidator from '../validator/yup';

export class ViewsValidatorFactory {
  static create(): ValidatorInterface<ViewsEntity> {
    return new ViewsYupValidator();
  }
}
