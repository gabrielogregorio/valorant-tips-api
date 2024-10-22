import { ValidatorInterface } from '@/domain/common/validators/validator.interface';
import { SuggestionEntityInterface } from '@/domain/suggestion/entity/interfaces';
import SuggestionYupValidator from '@/domain/suggestion/validator/suggestion.yup';

export class SuggestionValidatorFactory {
  static create(): ValidatorInterface<SuggestionEntityInterface> {
    return new SuggestionYupValidator();
  }
}
