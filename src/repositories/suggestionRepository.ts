/* eslint-disable import/no-restricted-paths */
import { ICreateSuggestion, IDatabaseSuggestion } from '@/interfaces/suggestion';
import { Suggestion } from '@/models/Suggestion';

export class SuggestionRepository {
  create = async (suggestion: ICreateSuggestion): Promise<IDatabaseSuggestion> => {
    const newSuggestion = new Suggestion(suggestion);

    await newSuggestion.save();

    return newSuggestion;
  };

  findAll = async (): Promise<IDatabaseSuggestion[]> => Suggestion.find();

  updateById = async (_id: string, status: IDatabaseSuggestion['status']): Promise<IDatabaseSuggestion | null> =>
    Suggestion.findOneAndUpdate({ _id }, { $set: { status } }, { new: true });

  deleteById = async (_id: string): Promise<void | null> => Suggestion.findOneAndDelete({ _id });

  count = async (): Promise<number> => Suggestion.countDocuments({});
}
