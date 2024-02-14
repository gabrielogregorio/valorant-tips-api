import mongoose from 'mongoose';

export interface ISuggestion {
  post_id: mongoose.Types.ObjectId;
  email: string;
  description: string;
  status: 'accepted' | 'rejected' | 'waiting';
}
