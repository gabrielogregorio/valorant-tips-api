import * as yup from 'yup';
import { ViewsEntity } from '../enttity';
import { ValidatorInterface } from '../../@shared/validators/validator.interface';

export default class ViewsYupValidator implements ValidatorInterface<ViewsEntity> {
  validate(entity: ViewsEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('id is required'),
          title: yup.string().required('name is required'),
        })
        .validateSync(
          {
            ip: entity.ip,
            // add reamains more items
          },
          { abortEarly: false },
        );
    } catch (e) {
      const errors = e as yup.ValidationError;
      errors.errors.forEach((error) => {
        entity.notification.addError({
          context: 'views',
          message: error,
        });
      });
    }
  }
}
