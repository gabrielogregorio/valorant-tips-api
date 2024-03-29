import { errorStateItemType } from '@/errors/types';

export class AppError {
  error: errorStateItemType;

  debug?: string;

  constructor(error: errorStateItemType, debug?: string) {
    this.error = error;
    this.debug = debug;
  }
}
