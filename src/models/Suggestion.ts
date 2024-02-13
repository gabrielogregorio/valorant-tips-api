import mongoose from 'mongoose';
import { ISuggestion } from '@/interfaces/suggestion';

const suggestionSchema = new mongoose.Schema<ISuggestion>(
  {
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
      background: true,
      required: true,
    },
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

export const Suggestion = mongoose.model<ISuggestion>('Suggestion', suggestionSchema);
