export interface IImagePost {
  id: string;
  description: string;
  image: string;
}

export interface IPost {
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
  imgs: IImagePost[];
}
