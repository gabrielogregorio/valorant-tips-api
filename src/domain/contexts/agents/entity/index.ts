import { Entity } from '@/domain/contexts/common/entity/entity.abstract';
import { UniqueId } from '@/domain/contexts/common/utils/UniqueId';
import { AgentsValidatorFactory } from '@/domain/contexts/contexts/agents/factory/validator';
import { AgentsEntityInterface } from './types';

type AgentsEntityDto = {
  id: UniqueId;
  name: string;
  imageUrl: string;
};

type AgentsEntityCreateDto = {
  imageUrl: string;
  name: string;
};

type AgentsEntityRestoreDto = {
  id: string;
  name: string;
  imageUrl: string;
};

export class AgentsEntity extends Entity implements AgentsEntityInterface {
  private readonly _id: UniqueId;

  private _imageUrl: string;

  private _name: string;

  private _validatorTypes = AgentsValidatorFactory.create();

  private constructor({ name, id, imageUrl }: AgentsEntityDto) {
    super();

    this._id = id;
    this._imageUrl = imageUrl;
    this._name = name;

    this._validate();
  }

  public static create(payload: AgentsEntityCreateDto) {
    return new AgentsEntity({
      id: new UniqueId(),
      name: payload.name,
      imageUrl: payload.imageUrl,
    });
  }

  public static restore(payload: AgentsEntityRestoreDto) {
    return new AgentsEntity({
      id: new UniqueId(payload.id),
      imageUrl: payload.imageUrl,
      name: payload.name,
    });
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get imageUrl() {
    return this._imageUrl;
  }

  public changeImageUrl(newUrl: string) {
    this._imageUrl = newUrl;
  }

  public changeName(name: string) {
    this._imageUrl = name;
  }

  private _validate() {
    this._validatorTypes.validate(this);
  }
}
