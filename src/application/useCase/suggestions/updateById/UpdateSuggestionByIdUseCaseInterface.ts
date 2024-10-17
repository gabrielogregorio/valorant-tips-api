import { statusSuggestionType } from '../../../../domain/suggestion/entity/interfaces';

export interface InputUpdateByIdSuggestionDto {
  email: string;
  description: string;
  postId: string;
}

export interface OutputUpdateByIdSuggestionDto {
  status: statusSuggestionType;
  email: string;
  description: string;
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSuggestionByIdUseCaseInterface {
  execute: (id: string, status: statusSuggestionType) => Promise<OutputUpdateByIdSuggestionDto>;
}
