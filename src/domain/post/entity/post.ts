import { Entity } from '@/domain/common/entity/entity.abstract';
import { NotificationError } from '@/domain/common/notification/notification.error';
import { UniqueIdGenerator } from '@/domain/common/utils/UniqueIdGenerator';
import { PostValidatorFactory } from '@/domain/post/factory/post.validator';
import { PostImagesInterface, PostInterface, PostTagsInterface } from '@/domain/post/entity/interfaces';

export class PostEntity extends Entity implements PostInterface {
  private _id: string;

  private _title: string;

  private _description: string;

  private _userId: string;

  private _tags: PostTagsInterface;

  private _imgs: PostImagesInterface[];

  get imgs() {
    return this._imgs;
  }

  get tags() {
    return this._tags;
  }

  get description() {
    return this._description;
  }

  get title() {
    return this._title;
  }

  get id() {
    return this._id;
  }

  get userId() {
    return this._userId;
  }

  constructor({
    title,
    imgs = [],
    description = '',
    tags = {
      ability: '',
      agent: '',
      difficult: '',
      map: '',
      mapPosition: '',
      moment: '',
      side: '',
    },
    userId,
    id = UniqueIdGenerator.generate(),
  }: {
    title: string;
    userId: string;
    id?: string;
    tags?: PostTagsInterface;
    imgs?: PostImagesInterface[];
    description?: string;
  }) {
    super();
    this._id = id;
    this._title = title;
    this._description = description;
    this._userId = userId;
    this._imgs = imgs;
    this._tags = tags;

    this.validate();
  }

  changeTags(tags: PostTagsInterface) {
    this._tags = tags;
    this.validate();
  }

  changeDescription(description: string) {
    this._description = description;
    this.validate();
  }

  changeImgs(imgs: PostImagesInterface[]) {
    this._imgs = imgs;
    this.validate();
  }

  validate() {
    PostValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
