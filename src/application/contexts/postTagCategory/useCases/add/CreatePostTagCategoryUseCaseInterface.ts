export interface CreatePostTagCategoryUseCaseOutputDtoInterface {
  id: string;
  name: string;
}

export interface CreatePostTagCategoryUseCaseInterface {
  execute: (name: string) => Promise<CreatePostTagCategoryUseCaseOutputDtoInterface>;
}
