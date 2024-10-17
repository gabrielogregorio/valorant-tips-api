export type statusSuggestionType = 'accepted' | 'rejected' | 'waiting';

export interface SuggestionEntityInterface {
  get status(): statusSuggestionType;
  get email(): string;
  get description(): string;
  get postId(): string;
  get id(): string;
  get createdAt(): string;
  get updatedAt(): string;
  delete: () => void;
}
