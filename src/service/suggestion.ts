import { Suggestion, ISuggestion } from '@/models/Sugestion';

export class SuggestionService {
  // eslint-disable-next-line camelcase
  static async Create({ post_id, email, description }: ISuggestion): Promise<ISuggestion> {
    const newSuggestion = new Suggestion({
      post_id,
      email,
      description,
    });
    await newSuggestion.save();
    return newSuggestion;
  }

  static async FindAll(): Promise<ISuggestion[]> {
    const suggestions = await Suggestion.find();
    return suggestions;
  }

  static async UpdateById(_id: string, status: 'accepted' | 'rejected'): Promise<ISuggestion> {
    const suggestionNew = await Suggestion.findOneAndUpdate({ _id }, { $set: { status } }, { new: true });
    return suggestionNew;
  }

  static async DeleteById(_id: string): Promise<any> {
    const deletedPost = await Suggestion.findOneAndDelete({ _id });
    return deletedPost;
  }
}
