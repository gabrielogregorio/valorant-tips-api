import { ISuggestionMongo, ISuggestionResponse } from '@/interfaces/suggestion';

export class DataSuggestion {
  static Build(suggestion: ISuggestionMongo): ISuggestionResponse {
    return {
      description: suggestion?.description,
      email: suggestion?.email,
      postId: suggestion.postId.toString(),
      id: suggestion?._id?.toString(),
      status: suggestion.status,
      createdAt: suggestion.createdAt,
      updatedAt: suggestion.updatedAt,
    };
  }
}
