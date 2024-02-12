import { UserController } from '@/controllers/userController';

export class DependencyController {
  private static userControllerInstance: UserController;

  static get userController(): UserController {
    if (!this.userControllerInstance) {
      this.userControllerInstance = new UserController();
    }
    return this.userController;
  }
}
