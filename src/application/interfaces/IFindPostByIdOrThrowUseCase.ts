export interface OutputFindPostByIdOrThrowUseCaseDto {
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
  imgs: { id: string; description: string; image: string }[];
}

export interface FindPostByIdOrThrowUseCaseInterface {
  execute: (postId: string) => Promise<OutputFindPostByIdOrThrowUseCaseDto>;
}
