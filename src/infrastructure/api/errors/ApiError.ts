import { errorStateItemType } from '@/errors/types';

export class ApiError {
  error: errorStateItemType;

  debug?: string;

  constructor(error: errorStateItemType, debug?: string) {
    this.error = error;
    this.debug = debug;
  }
}
