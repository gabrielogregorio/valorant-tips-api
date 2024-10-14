export interface PostInterface {
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
}
