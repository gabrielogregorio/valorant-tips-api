import { UniqueId } from '@/domain/contexts/common/utils/UniqueId';
import { MapsValidatorFactory } from '@/domain/contexts/contexts/maps/factory/validator';
import { Entity } from '@/domain/contexts/common/entity/entity.abstract';
import { MapEntityInterface } from './interfaces';

type MapsEntityDto = {
  id: UniqueId;
  name: string;
  imageUrl: string;
};

type MapsEntityCreateDto = {
  imageUrl: string;
  name: string;
};

type MapsEntityRestoreDto = {
  id: string;
  name: string;
  imageUrl: string;
};

export class MapsEntity extends Entity implements MapEntityInterface {
  private _id: UniqueId;

  private _imageUrl: string;

  private _name: string;

  private _validatorTypes = MapsValidatorFactory.create();

  private constructor({ name, id, imageUrl }: MapsEntityDto) {
    super();

    this._id = id;
    this._imageUrl = imageUrl;
    this._name = name;

    this._validate();
  }

  get id(): UniqueId {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get imageUrl(): string {
    return this._imageUrl;
  }

  public changeName(newName: string) {
    this._name = newName;
  }

  public changeImageUrl(imageUrl: string) {
    this._imageUrl = imageUrl;
  }

  public static create(payload: MapsEntityCreateDto) {
    return new MapsEntity({
      id: new UniqueId(),
      name: payload.name,
      imageUrl: payload.imageUrl,
    });
  }

  public static restore(payload: MapsEntityRestoreDto) {
    return new MapsEntity({
      id: new UniqueId(payload.id),
      imageUrl: payload.imageUrl,
      name: payload.name,
    });
  }

  private _validate() {
    this._validatorTypes.validate(this);
  }
}
