import { ObjectId } from 'mongoose';

export interface ISuggestion {
  post_id: ObjectId;
  email: string;
  description: string;
  status: 'accepted' | 'rejected' | 'waiting';
}
