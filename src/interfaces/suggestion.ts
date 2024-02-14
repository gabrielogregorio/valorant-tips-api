import mongoose from 'mongoose';

export interface ISuggestionMongo {
  _id: string;
  post_id: mongoose.Types.ObjectId;
  email: string;
  description: string;
  status: 'accepted' | 'rejected' | 'waiting';
}
