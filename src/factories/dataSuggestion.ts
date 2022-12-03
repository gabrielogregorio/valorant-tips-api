export type factorySuggestionType = {
  description: string;
  email: string;
  id: string;
};
export class DataSuggestion {
  static Build(suggestion: any): factorySuggestionType {
    return {
      description: suggestion?.description,
      email: suggestion?.email,
      id: suggestion?._id?.toString(),
    };
  }
}
