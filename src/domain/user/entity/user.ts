import { randomUUID } from 'crypto';
import { Entity } from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { UserValidatorFactory } from '../factory/user.validator';
import { UserEntityInterface } from './user.interface';

export class UserEntity extends Entity implements UserEntityInterface {
  private _id: string;

  private _username: string;

  private _password: string;

  private _image: string;

  constructor({
    id = randomUUID(),
    username = '',
    password = '',
  }: {
    id?: string;
    username?: string;
    password?: string;
  }) {
    super();
    this._id = id;
    this._username = username;
    this._password = password;
    this._image = '';

    this.validate();
  }

  changePassword(password: string) {
    this._password = password;
    this.validate();
  }

  changeImage(image: string) {
    this._image = image;
    this.validate();
  }

  changeUsername(username: string) {
    this._username = username;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get image() {
    return this._image;
  }

  get username() {
    return this._username;
  }

  get password() {
    return this._password;
  }

  validate() {
    UserValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
