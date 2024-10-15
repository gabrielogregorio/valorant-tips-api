import { IDatabaseSuggestion, IResponseSuggestion } from '@/interfaces/suggestion';

export class DataSuggestion {
  static Build(suggestion: IDatabaseSuggestion): IResponseSuggestion {
    return {
      description: suggestion?.description,
      email: suggestion?.email,
      postId: suggestion.postId.toString(),
      id: suggestion?.id?.toString(),
      status: suggestion.status,
      createdAt: suggestion.createdAt,
      updatedAt: suggestion.updatedAt,
    };
  }
}
