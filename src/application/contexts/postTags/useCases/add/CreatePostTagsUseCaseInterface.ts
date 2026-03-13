export interface CreatePostTagsUseCaseOutputDtoInterface {
  id: string;
  name: string;
  categoryId: string;
}

export interface CreatePostTagsUseCaseInterface {
  execute: (name: string, categoryId: string) => Promise<CreatePostTagsUseCaseOutputDtoInterface>;
}
