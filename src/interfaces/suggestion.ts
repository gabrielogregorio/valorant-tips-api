import mongoose from 'mongoose';

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
  id: mongoose.Types.ObjectId;
  postId: mongoose.Types.ObjectId;
  createdAt: string;
  updatedAt: string;
}

export interface IResponseSuggestion extends ISuggestion {
  id: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
}
