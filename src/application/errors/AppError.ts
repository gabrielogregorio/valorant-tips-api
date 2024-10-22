// src/application/errors/AppError.ts

import { codeErrors } from '@/application/errors/types';

export type ErrorContext = {
  username?: string;
  id?: string;
  postId?: string;
  suggestionId?: string;
  available?: boolean;
  code?: string;
  userId?: string;
};

export class AppError extends Error {
  public code: codeErrors;
  public context?: ErrorContext;

  constructor(code: codeErrors, context?: ErrorContext) {
    super();
    this.code = code;
    this.context = context;
  }
}
