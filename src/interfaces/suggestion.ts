import mongoose from 'mongoose';

type statusSuggestionType = 'accepted' | 'rejected' | 'waiting';

export interface ISuggestionCreate {
  postId: string;
  email: string;
  description: string;
  status: statusSuggestionType;
}

export interface ISuggestionMongo {
  _id: string;
  createdAt: string;
  updatedAt: string;
  postId: mongoose.Types.ObjectId;
  email: string;
  description: string;
  status: statusSuggestionType;
}

export interface ISuggestionResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  email: string;
  description: string;
  status: statusSuggestionType;
}
