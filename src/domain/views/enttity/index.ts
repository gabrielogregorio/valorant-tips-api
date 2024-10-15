import { Entity } from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { ViewsValidatorFactory } from '../factory/validator';

export interface ViewsEntityInterface {
  get ip(): string;
  get dateAccess(): Date;

  validate(): void;
}

export class ViewsEntity extends Entity implements ViewsEntityInterface {
  private _ip: string;

  private _dateAccess: Date;

  constructor({ dateAccess = new Date(), ip }: { dateAccess?: Date; ip: string }) {
    super();

    this._ip = ip;
    this._dateAccess = dateAccess;
  }

  get dateAccess(): Date {
    return this._dateAccess;
  }

  get ip(): string {
    return this._ip;
  }

  validate() {
    ViewsValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
