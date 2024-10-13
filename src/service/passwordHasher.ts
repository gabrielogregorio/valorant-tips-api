import { randomBytes, pbkdf2Sync } from 'crypto';

export interface PasswordHasher {
  generateHashPassword(password: string): Promise<string>;
  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}

const configHasher = {
  iterations: 100,
  keylen: 64,
  digest: 'sha512',
};

export class CryptoPasswordHasher implements PasswordHasher {
  async generateHashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, configHasher.iterations, configHasher.keylen, configHasher.digest).toString(
      'hex',
    );
    return `${salt}:${hash}`;
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, originalHash] = hashedPassword.split(':');
    const hash = pbkdf2Sync(password, salt, configHasher.iterations, configHasher.keylen, configHasher.digest).toString(
      'hex',
    );
    return hash === originalHash;
  }
}
