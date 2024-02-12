export interface ISuggestion {
  post_id: string;
  email: string;
  description: string;
  status: 'accepted' | 'rejected';
}
