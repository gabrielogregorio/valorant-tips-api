export interface PasswordHasherInterface {
  generateHashPassword(password: string): Promise<string>;
  validatePassword(password: string, hashedPassword: string): Promise<boolean>;
}
