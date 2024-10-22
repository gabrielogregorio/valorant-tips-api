export interface UserEntityInterface {
  get id(): string;
  get username(): string;
  get password(): string;
  get image(): string;

  changeUsername(username: string): void;
  changePassword(passwordHash: string): void;
  changeImage(image: string): void;
  validate(): void;
}
