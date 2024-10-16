/* eslint-disable import/no-restricted-paths */
import { SuggestionEntity } from '../../../../domain/suggestion/entity';
import { SuggestionEntityInterface } from '../../../../domain/suggestion/entity/interfaces';
import { SuggestionAggregateRepositoryInterface } from '../../../../domain/suggestion/repository';

import { Suggestion } from './Suggestion';

export class SuggestionRepository implements SuggestionAggregateRepositoryInterface {
  save = async (suggestion: SuggestionEntityInterface): Promise<SuggestionEntityInterface> => {
    const newSuggestion = new Suggestion({
      description: suggestion.description,
      email: suggestion.email,
      id: suggestion.id,
      createdAt: suggestion.createdAt,
      postId: suggestion.postId,
      status: suggestion.status,
      updatedAt: suggestion.updatedAt
    });

    await newSuggestion.save();

    return suggestion;
  };

  findById = async (id: string): Promise<SuggestionEntityInterface> => {
    const suggestion = await Suggestion.findOne({ id });
    if (!suggestion) {
      throw new Error('Suggestion not found');
    }

    return new SuggestionEntity({
      description: suggestion.description,
      email: suggestion.email,
      postId: suggestion.postId.toString(),
      createdAt: suggestion.createdAt,
      id: suggestion.id,
      status: suggestion.status,
      updatedAt: suggestion.updatedAt,
    });
  };

  findAll = async (): Promise<SuggestionEntityInterface[]> => {
    const suggestions = await Suggestion.find();

    return suggestions.map(
      (suggestion) =>
        new SuggestionEntity({
          description: suggestion.description,
          email: suggestion.email,
          postId: suggestion.postId,
          createdAt: suggestion.createdAt,
          id: suggestion.id,
          status: suggestion.status,
          updatedAt: suggestion.updatedAt,
        }),
    );
  };

  updateById = async (
    id: string,
    status: SuggestionEntityInterface['status'],
  ): Promise<SuggestionEntityInterface | null> =>
    Suggestion.findOneAndUpdate({ id }, { $set: { status } }, { new: true });

  deleteById = async (id: string): Promise<void | null> => Suggestion.findOneAndDelete({ id });

  count = async (): Promise<number> => Suggestion.countDocuments({});
}
