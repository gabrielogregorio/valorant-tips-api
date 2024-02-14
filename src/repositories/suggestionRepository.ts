/* eslint-disable import/no-restricted-paths */
import { ISuggestion } from '@/interfaces/suggestion';
import { Suggestion } from '@/models/Suggestion';

export class SuggestionRepository {
  create = async (suggestion: ISuggestion): Promise<ISuggestion> => {
    const newSuggestion = new Suggestion(suggestion);

    await newSuggestion.save();

    return newSuggestion;
  };

  findAll = async (): Promise<ISuggestion[]> => Suggestion.find();

  updateById = async (_id: string, status: ISuggestion['status']): Promise<ISuggestion | null> =>
    Suggestion.findOneAndUpdate({ _id }, { $set: { status } }, { new: true });

  deleteById = async (_id: string): Promise<void | null> => Suggestion.findOneAndDelete({ _id });

  count = async (): Promise<number> => Suggestion.countDocuments({});
}
