import mongoose from 'mongoose';

export interface ISuggestion {
  post_id: string;
  email: string;
  description: string;
  status: 'accepted' | 'rejected';
}

const suggestionSchema = new mongoose.Schema<ISuggestion>(
  {
    post_id: String,
    email: String,
    description: String,
    status: String,
  },
  {
    timestamps: true,
  },
);

export const Suggestion = mongoose.model<ISuggestion>('Suggestion', suggestionSchema);
