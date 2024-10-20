import { Entity } from '@/domain/common/entity/entity.abstract';
import { NotificationError } from '@/domain/common/notification/notification.error';
import { UniqueIdGenerator } from '@/domain/common/utils/UniqueIdGenerator';
import { statusSuggestionType, SuggestionEntityInterface } from '@/domain/suggestion/entity/interfaces';
import { SuggestionValidatorFactory } from '@/domain/suggestion/factory/suggestion.validator';

export class SuggestionEntity extends Entity implements SuggestionEntityInterface {
  private _status: statusSuggestionType;

  private _email: string;

  private _description: string;

  private _postId: string;

  private _id: string;

  private _createdAt: string;

  private _updatedAt: string;

  constructor({
    id = UniqueIdGenerator.generate(),
    status,
    email,
    description,
    postId,
    createdAt,
    updatedAt,
  }: {
    status?: statusSuggestionType;
    email: string;
    description: string;
    postId: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  }) {
    super();
    this._id = id;
    this._status = status || 'waiting';
    this._email = email;
    this._description = description;
    this._postId = postId;
    this._createdAt = createdAt || new Date().toISOString();
    this._updatedAt = updatedAt || new Date().toISOString();

    this.validate();
  }

  get id() {
    return this._id;
  }

  get status() {
    return this._status;
  }

  get email() {
    return this._email;
  }

  get postId() {
    return this._postId;
  }

  get description() {
    return this._description;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  public delete() {
    console.log('DELETED_ENTITY');
  }

  validate() {
    SuggestionValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
