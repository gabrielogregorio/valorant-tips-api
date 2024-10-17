import * as yup from 'yup';
import { ValidatorInterface } from '../../common/validators/validator.interface';
import { UserEntity } from '../entity/user';

export default class UserYupValidator implements ValidatorInterface<UserEntity> {
  validate(entity: UserEntity): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('id is required'), // validar aqui
        })
        .validateSync(
          {
            id: entity.id,
          },
          { abortEarly: false },
        );
    } catch (e) {
      const errors = e as yup.ValidationError;
      errors.errors.forEach((error) => {
        entity.notification.addError({
          context: 'user',
          message: error,
        });
      });
    }
  }
}
