import { SuggestionEntityInterface } from '@/domain/contexts/contexts/suggestion/entity/interfaces';
import { SuggestionRepositoryInterface } from '@/domain/contexts/contexts/suggestion/repository';
import { SuggestionEntity } from '@/domain/contexts/contexts/suggestion/entity';
import { Suggestion } from './Suggestion';

export class SuggestionRepository implements SuggestionRepositoryInterface {
  save = async (suggestion: SuggestionEntityInterface): Promise<SuggestionEntityInterface> => {
    const newSuggestion = new Suggestion({
      description: suggestion.description,
      email: suggestion.email,
      id: suggestion.id.getValue(),
      createdAt: suggestion.createdAt,
      postId: suggestion.postId.getValue(),
      status: suggestion.status,
      updatedAt: suggestion.updatedAt,
    });

    await newSuggestion.save();

    return suggestion;
  };

  findById = async (id: string): Promise<SuggestionEntityInterface> => {
    const suggestion = await Suggestion.findOne({ id });
    if (!suggestion) {
      throw new Error('Suggestion not found');
    }

    return SuggestionEntity.restore({
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

    return suggestions.map((suggestion) =>
      SuggestionEntity.restore({
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

  update = async (payload: SuggestionEntityInterface): Promise<SuggestionEntityInterface> => {
    const suggestion = await Suggestion.findOneAndUpdate(
      { id: payload.id.getValue() },
      { $set: payload },
      { new: true },
    );

    return SuggestionEntity.restore({
      description: suggestion.description,
      email: suggestion.email,
      postId: suggestion.postId.toString(),
      createdAt: suggestion.createdAt,
      id: suggestion.id,
      status: suggestion.status,
      updatedAt: suggestion.updatedAt,
    });
  };

  count = async (): Promise<number> => Suggestion.countDocuments({});
}
