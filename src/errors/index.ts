import { errorStateItemType } from '@/errors/types';

export class AppError {
  error: errorStateItemType;

  debug: unknown;

  constructor(error: errorStateItemType, debug?: unknown) {
    this.error = error;
    this.debug = debug;
  }
}
