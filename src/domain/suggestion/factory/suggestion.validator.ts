import { ValidatorInterface } from '../../@shared/validators/validator.interface';
import { SuggestionEntityInterface } from '../entity/interfaces';
import SuggestionYupValidator from '../validator/suggestion.yup';

export class SuggestionValidatorFactory {
  static create(): ValidatorInterface<SuggestionEntityInterface> {
    return new SuggestionYupValidator();
  }
}
