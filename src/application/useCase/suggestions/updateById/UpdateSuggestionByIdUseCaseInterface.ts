import { statusSuggestionType } from '@/domain/suggestion/entity/interfaces';

export interface UpdateByIdSuggestionInputDto {
  email: string;
  description: string;
  postId: string;
}

export interface UpdateByIdSuggestionOutputDto {
  status: statusSuggestionType;
  email: string;
  description: string;
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSuggestionByIdUseCaseInterface {
  execute: (id: string, status: statusSuggestionType) => Promise<UpdateByIdSuggestionOutputDto>;
}
