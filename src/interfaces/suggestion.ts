import mongoose from 'mongoose';

type statusSuggestionType = 'accepted' | 'rejected' | 'waiting';

interface ISuggestion {
  status: statusSuggestionType;
  email: string;
  description: string;
}

export interface ICreateSuggestion extends ISuggestion {
  postId: string;
}

export interface IDatabaseSuggestion extends ISuggestion {
  _id: mongoose.Types.ObjectId;
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
