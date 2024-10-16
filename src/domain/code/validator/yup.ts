import * as yup from 'yup';
import { CodeEntity } from '../enttity';
import { ValidatorInterface } from '../../common/validators/validator.interface';

export default class CodeYupValidator implements ValidatorInterface<CodeEntity> {
  validate(entity: CodeEntity): void {
    try {
      yup
        .object()
        .shape({
          // id: yup.string().required('id is required'),
        })
        .validateSync(
          {
            id: entity.code,
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
