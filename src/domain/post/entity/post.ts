import { randomUUID } from 'crypto';
import { Entity } from '../../common/entity/entity.abstract';
import { NotificationError } from '../../common/notification/notification.error';
import { PostValidatorFactory } from '../factory/post.validator';
import { PostInterface, PostInterfaceImage, PostInterfaceTags } from './post.interface';

type PostEntityTags = {
  moment: string;
  difficult: string;
  ability: string;
  side: string;
  map: string;
  mapPosition: string;
  agent: string;
};

type PostEntityImages = {
  id: string;
  description: string;
  image: string;
};

export class PostEntity extends Entity implements PostInterface {
  private _id: string;

  private _title: string;

  private _description: string;

  private _userId: string;

  private _tags: PostEntityTags;

  private _imgs: PostEntityImages[];

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
    // tirar daqui
    id = randomUUID(),
  }: {
    title: string;
    userId: string;
    id?: string;
    tags?: PostEntityTags;
    imgs?: PostEntityImages[];
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

  changeTags(tags: PostInterfaceTags) {
    this._tags = tags;
    this.validate();
  }

  changeDescription(description: string) {
    this._description = description;
    this.validate();
  }

  changeImgs(imgs: PostInterfaceImage[]) {
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
