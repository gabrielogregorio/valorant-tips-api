import mongoose from 'mongoose';
import { ISuggestion } from 'src/interfaces/suggestion';

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
