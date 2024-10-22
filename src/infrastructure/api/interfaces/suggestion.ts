export type statusSuggestionType = 'accepted' | 'rejected' | 'waiting';

interface ISuggestion {
  status: statusSuggestionType;
  email: string;
  description: string;
}

export interface ICreateSuggestion extends ISuggestion {
  postId: string;
}

export interface IDatabaseSuggestion extends ISuggestion {
  id: string;
  postId: string;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseSuggestion extends ISuggestion {
  id: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
}
