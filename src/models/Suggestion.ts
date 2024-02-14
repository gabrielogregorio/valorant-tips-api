import mongoose from 'mongoose';
import { ISuggestionMongo } from '@/interfaces/suggestion';

const suggestionSchema = new mongoose.Schema<ISuggestionMongo>(
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

export const Suggestion = mongoose.model<ISuggestionMongo>('Suggestion', suggestionSchema);
