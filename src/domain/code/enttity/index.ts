import { v4 as uuidV4 } from 'uuid';
import { Entity } from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { CodeValidatorFactory } from '../factory/validator';

export interface CodeEntityInterface {
  get code(): string;
  get available(): boolean;

  useCode(): void;
  validate(): void;
}

export class CodeEntity extends Entity implements CodeEntityInterface {
  code: string;

  available: boolean;

  constructor({ available = true, code = uuidV4() }: { code?: string; available?: boolean } = {}) {
    super();
    this.available = available;
    this.code = code;
  }

  useCode() {
    this.available = false;
    this.validate();
  }

  validate() {
    CodeValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
