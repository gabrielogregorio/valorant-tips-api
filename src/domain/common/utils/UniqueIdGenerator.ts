import { randomUUID } from 'crypto';

/**
 * This function serves to decouple the randomUUID from the entities, but without needing to be injected, which would make the code much more verbose. This is a tradeoff I accepted
 */
export class UniqueIdGenerator {
  static generate(): string {
    return randomUUID();
  }
}
