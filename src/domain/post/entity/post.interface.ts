export type PostInterfaceImage = {
  id: string;
  description: string;
  image: string;
};

export type PostInterfaceTags = {
  moment: string;
  difficult: string;
  ability: string;
  side: string;
  map: string;
  mapPosition: string;
  agent: string;
};

export interface PostInterface {
  get id(): string;

  get title(): string;

  get description(): string;

  get userId(): string;

  get tags(): PostInterfaceTags;

  get imgs(): PostInterfaceImage[];

  changeTags(tags: PostInterfaceTags): void;

  changeDescription(description: string): void;
  changeImgs(imgs: PostInterfaceImage[]): void;

  validate(): void;
}
