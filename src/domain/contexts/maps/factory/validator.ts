import { ValidatorInterface } from '@/domain/contexts/common/validators';
import { MapsZodValidator } from '@/infrastructure/contexts/maps/validator';
import { MapsEntity } from '../entity';

export class MapsValidatorFactory {
  static create(): ValidatorInterface<MapsEntity> {
    return new MapsZodValidator();
  }
}
