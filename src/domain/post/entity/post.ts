import { randomUUID } from 'crypto';
import { Entity } from '../../@shared/entity/entity.abstract';
import { NotificationError } from '../../@shared/notification/notification.error';
import { PostValidatorFactory } from '../factory/post.validator';
import { PostInterface } from './post.interface';

export class PostEntity extends Entity implements PostInterface {
  id: string;

  title: string;

  description: string;

  userId: string;

  tags: {
    moment: string;
    difficult: string;
    ability: string;
    side: string;
    map: string;
    mapPosition: string;
    agent: string;
  };

  imgs: {
    id: String;
    description: String;
    image: String;
  }[];

  constructor({ title, userId }: { title: string; userId: string }) {
    super();
    this.id = randomUUID(); // tirar daqui
    this.title = title;
    this.description = '';
    this.userId = userId;
    this.imgs = [];
    this.tags = {
      ability: '',
      agent: '',
      difficult: '',
      map: '',
      mapPosition: '',
      moment: '',
      side: '',
    };

    this.validate();
  }

  changeTags(tags: PostInterface['tags']) {
    this.tags = tags;
    this.validate();
  }

  changeDescription(description: string) {
    this.description = description;
    this.validate();
  }

  changeImgs(imgs: PostInterface['imgs']) {
    this.imgs = imgs;
    this.validate();
  }

  validate() {
    PostValidatorFactory.create().validate(this);

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }
}
