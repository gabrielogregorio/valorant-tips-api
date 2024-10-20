import { randomBytes, pbkdf2Sync } from 'crypto';
import { PasswordHasherInterface } from '../../domain/services/PasswordHasherInterface';

const configHasher = {
  iterations: 100,
  keylen: 64,
  digest: 'sha512',
};

export class PasswordHasher implements PasswordHasherInterface {
  async generateHashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, configHasher.iterations, configHasher.keylen, configHasher.digest).toString(
      'hex',
    );
    return `${salt}:${hash}`;
  }

  async passwordIsValid(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, originalHash] = hashedPassword.split(':');
    const hash = pbkdf2Sync(password, salt, configHasher.iterations, configHasher.keylen, configHasher.digest).toString(
      'hex',
    );
    return hash === originalHash;
  }
}
