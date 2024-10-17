import { statusSuggestionType } from '../../../../domain/suggestion/entity/interfaces';

export interface InputCreateSuggestionDto {
  email: string;
  description: string;
  postId: string;
}

export interface OutputSuggestionDto {
  status: statusSuggestionType;
  email: string;
  description: string;
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSuggestionUseCaseInterface {
  execute: (dto: InputCreateSuggestionDto) => Promise<OutputSuggestionDto>;
}
