import * as yup from 'yup';
import { PostEntity } from '../entity/post';
import { ValidatorInterface } from '../../@shared/validators/validator.interface';

export default class PostYupValidator implements ValidatorInterface<PostEntity> {
  validate(entity: PostEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('id is required'),
          title: yup.string().required('name is required'),
        })
        .validateSync(
          {
            id: entity.id,
            title: entity.title,
            // add reamains more items
          },
          { abortEarly: false },
        );
    } catch (e) {
      const errors = e as yup.ValidationError;
      errors.errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error,
        });
      });
    }
  }
}
