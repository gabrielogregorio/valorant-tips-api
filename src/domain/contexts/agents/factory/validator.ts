import { ValidatorInterface } from '@/domain/contexts/common/validators';
import { AgentsEntity } from '@/domain/contexts/contexts/agents/entity';
import { AgentsZodValidator } from '@/infrastructure/contexts/agents/validator';

export class AgentsValidatorFactory {
  static create(): ValidatorInterface<AgentsEntity> {
    return new AgentsZodValidator();
  }
}
