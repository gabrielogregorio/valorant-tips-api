import { getImagePath } from '@/infrastructure/api/helpers/getImagePath';

interface PostPresenterInputInterface {
  id: string;
  title: string;
  description: string;

  authors: {
    id: string;
    username: string;
    imageUrl: string;
  }[];
  agents: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
  maps: {
    id: string;
    imageUrl: string;
    name: string;
  }[];
  steps: {
    id: string;
    description: string;
    imageUrl: string;
  }[];
}

export interface PostViewModelOutputInterface {
  id: string;
  title: string;
  description: string;
  agents: {
    id: string;
    imageUrl: string;
    name: string;
  }[];

  maps: {
    id: string;
    imageUrl: string;
    name: string;
  }[];

  steps: {
    id: string;
    description: string;
    imageUrl: string;
  }[];

  authors: {
    id: string;
    username: string;
    imageUrl: string;
  }[];
}

export class PostPresenter {
  static toViewModel(input: PostPresenterInputInterface): PostViewModelOutputInterface {
    console.log(input.authors);
    return {
      title: input.title,
      description: input.description,
      agents: input.agents,
      authors: input.authors.map((author) => ({
        imageUrl: author.imageUrl ? getImagePath(author.imageUrl) : undefined,
        username: author.username,
        id: author.id,
      })),
      id: input.id,
      maps: input.maps,
      steps: input.steps.map((step) => ({
        ...step,
        imageUrl: getImagePath(step.imageUrl),
      })),
    };
  }

  static toViewModelList(output: PostPresenterInputInterface[]): PostViewModelOutputInterface[] {
    return output.map(PostPresenter.toViewModel);
  }
}
