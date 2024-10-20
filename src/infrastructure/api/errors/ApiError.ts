import { errorStateItemType } from '@/infrastructure/api/errors/types';

export class ApiError extends Error {
  error: errorStateItemType;

  context?: string;

  constructor(error: errorStateItemType, context?: string) {
    super();
    this.error = error;
    this.context = context;
  }
}
