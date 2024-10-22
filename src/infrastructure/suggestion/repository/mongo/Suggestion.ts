import mongoose from 'mongoose';
import { IDatabaseSuggestion } from '../../../api/interfaces/suggestion';

const suggestionSchema = new mongoose.Schema<IDatabaseSuggestion>(
  {
    id: {
      type: String,
      unique: true,
    },
    postId: String,
    email: {
      type: String,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      maxlength: 500,
    },
    status: {
      type: String,
      index: true,
      background: true,
      required: true,
      enum: ['accepted', 'rejected', 'waiting'],
    },
  },
  {
    timestamps: true,
  },
);

export const Suggestion = mongoose.model<IDatabaseSuggestion>('Suggestion', suggestionSchema);
