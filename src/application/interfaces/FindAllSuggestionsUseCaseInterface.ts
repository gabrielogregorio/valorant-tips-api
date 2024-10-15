import { statusSuggestionType } from '../../interfaces/suggestion';

export interface OutputFindAllSuggestionsDto {
  status: statusSuggestionType;
  email: string;
  description: string;
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface FindAllSuggestionsUseCaseInterface {
  execute: () => Promise<OutputFindAllSuggestionsDto[]>;
}
