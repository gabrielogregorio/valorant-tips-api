import { statusSuggestionType } from '../../interfaces/suggestion';

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

export interface UpdateByIdSuggestionUseCaseInterface {
  execute: (id: string, status: statusSuggestionType) => Promise<OutputUpdateByIdSuggestionDto>;
}
