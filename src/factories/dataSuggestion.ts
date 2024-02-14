import { ISuggestionMongo } from '@/interfaces/suggestion';

export type factorySuggestionType = {
  description: string;
  email: string;
  post_id: string;
  id: string;
  status: string;
};
export class DataSuggestion {
  static Build(suggestion: ISuggestionMongo): factorySuggestionType {
    return {
      description: suggestion?.description,
      email: suggestion?.email,
      post_id: suggestion.post_id.toString(),
      id: suggestion?._id?.toString(),
      status: suggestion.status,
    };
  }
}
