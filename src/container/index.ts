import { CodeController } from '@/controllers/codeController';
import { DashboardController } from '@/controllers/dashboardController';
import { PostController } from '@/controllers/postController';
import { SuggestionController } from '@/controllers/suggestionController';
import { UserController } from '@/controllers/userController';
import { ViewsController } from '@/controllers/viewsController';

export class DependencyController {
  private static userControllerInstance: UserController;

  private static postControllerInstance: PostController;

  private static suggestionControllerInstance: SuggestionController;

  private static codeControllerInstance: CodeController;

  private static dashboardControllerInstance: DashboardController;

  private static viewsControllerInstance: ViewsController;

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

  static get SuggestionController(): SuggestionController {
    if (!this.suggestionControllerInstance) {
      this.suggestionControllerInstance = new SuggestionController();
    }
    return this.suggestionControllerInstance;
  }

  static get CodeController(): CodeController {
    if (!this.codeControllerInstance) {
      this.codeControllerInstance = new CodeController();
    }
    return this.codeControllerInstance;
  }

  static get DashboardController(): DashboardController {
    if (!this.dashboardControllerInstance) {
      this.dashboardControllerInstance = new DashboardController();
    }
    return this.dashboardControllerInstance;
  }

  static get ViewsController(): ViewsController {
    if (!this.viewsControllerInstance) {
      this.viewsControllerInstance = new ViewsController();
    }
    return this.viewsControllerInstance;
  }
}
