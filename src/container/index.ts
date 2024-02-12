import { PostController } from '@/controllers/postController';
import { UserController } from '@/controllers/userController';

export class DependencyController {
  private static userControllerInstance: UserController;

  private static postControllerInstance: PostController;

  static get userController(): UserController {
    if (!this.userControllerInstance) {
      this.userControllerInstance = new UserController();
    }
    return this.userController;
  }

  static get PostController(): PostController {
    if (!this.postControllerInstance) {
      this.postControllerInstance = new PostController();
    }
    return this.postControllerInstance;
  }
}
