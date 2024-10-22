import { ValidatorInterface } from '@/domain/common/validators/validator.interface';
import { SuggestionEntity } from '@/domain/suggestion/entity';
import * as yup from 'yup';

export default class SuggestionYupValidator implements ValidatorInterface<SuggestionEntity> {
  validate(entity: SuggestionEntity): void {
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
