import { Suggestion, ISuggestion } from '@/models/Suggestion';

export class SuggestionService {
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
    return Suggestion.find();
  }

  static async UpdateById(_id: string, status: 'accepted' | 'rejected'): Promise<ISuggestion> {
    return Suggestion.findOneAndUpdate({ _id }, { $set: { status } }, { new: true });
  }

  static async DeleteById(_id: string): Promise<any> {
    return Suggestion.findOneAndDelete({ _id });
  }
}
