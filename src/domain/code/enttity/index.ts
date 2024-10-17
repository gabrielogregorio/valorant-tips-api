import { v4 as uuidV4 } from 'uuid';
import { CodeValidatorFactory } from '../factory/validator';
import { Entity } from '../../common/entity/entity.abstract';
import { NotificationError } from '../../common/notification/notification.error';

export interface CodeEntityInterface {
  get code(): string;
  get available(): boolean;
  get id(): string;

  useCode(): void;
  validate(): void;
}

export class CodeEntity extends Entity implements CodeEntityInterface {
  _code: string;

  _id: string;

  _available: boolean;

  constructor({
    available = true,
    code = uuidV4(),
    id = uuidV4(),
  }: { code?: string; available?: boolean; id?: string } = {}) {
    super();
    this._available = available;
    this._code = code;
    this._id = id;
  }

  get id(): string {
    return this._id;
  }

  get available(): boolean {
    return this._available;
  }

  get code(): string {
    return this._code;
  }

  useCode() {
    this._available = false;
    this.validate();
  }

  validate() {
    CodeValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
