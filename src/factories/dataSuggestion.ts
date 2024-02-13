import { ISuggestion } from '@/interfaces/suggestion';

export type factorySuggestionType = {
  description: string;
  email: string;
  id: string;
  status: string;
};
export class DataSuggestion {
  static Build(suggestion: ISuggestion): factorySuggestionType {
    return {
      description: suggestion?.description,
      email: suggestion?.email,
      id: suggestion?._id?.toString(),
      status: suggestion.status,
    };
  }
}
