import { CodeController } from '@/controllers/codeController';
import { DashboardController } from '@/controllers/dashboardController';
import { PostController } from '@/controllers/postController';
import { SuggestionController } from '@/controllers/suggestionController';
import { UserController } from '@/controllers/userController';
import { ViewsController } from '@/controllers/viewsController';
import { CodeService } from '@/service/Code';
import { ViewService } from '@/service/View';
import { DashboardService } from '@/service/dashboard';
import { PostService } from '@/service/post';
import { SuggestionService } from '@/service/suggestion';
import { UserService } from '@/service/user';

export class DependencyController {
  private static userControllerInstance: UserController;

  private static postControllerInstance: PostController;

  private static suggestionControllerInstance: SuggestionController;

  private static codeControllerInstance: CodeController;

  private static dashboardControllerInstance: DashboardController;

  private static viewsControllerInstance: ViewsController;

  private static codeServiceInstance: CodeService;

  private static dashboardServiceInstance: DashboardService;

  private static postServiceInstance: PostService;

  private static suggestionServiceInstance: SuggestionService;

  private static userServiceInstance: UserService;

  private static viewServiceInstance: ViewService;

  static get userController(): UserController {
    if (!this.userControllerInstance) {
      this.userControllerInstance = new UserController(this.codeServiceInstance, this.userServiceInstance);
    }
    return this.userController;
  }

  static get PostController(): PostController {
    if (!this.postControllerInstance) {
      this.postControllerInstance = new PostController(this.postServiceInstance);
    }
    return this.postControllerInstance;
  }

  static get SuggestionController(): SuggestionController {
    if (!this.suggestionControllerInstance) {
      this.suggestionControllerInstance = new SuggestionController(this.suggestionServiceInstance);
    }
    return this.suggestionControllerInstance;
  }

  static get CodeController(): CodeController {
    if (!this.codeControllerInstance) {
      this.codeControllerInstance = new CodeController(this.codeServiceInstance);
    }
    return this.codeControllerInstance;
  }

  static get DashboardController(): DashboardController {
    if (!this.dashboardControllerInstance) {
      this.dashboardControllerInstance = new DashboardController(this.dashboardServiceInstance);
    }
    return this.dashboardControllerInstance;
  }

  static get ViewsController(): ViewsController {
    if (!this.viewsControllerInstance) {
      this.viewsControllerInstance = new ViewsController(this.viewServiceInstance);
    }
    return this.viewsControllerInstance;
  }

  static get CodeService(): CodeService {
    if (!this.codeServiceInstance) {
      this.codeServiceInstance = new CodeService();
    }
    return this.codeServiceInstance;
  }

  static get DashboardService(): DashboardService {
    if (!this.dashboardServiceInstance) {
      this.dashboardServiceInstance = new DashboardService();
    }

    return this.dashboardServiceInstance;
  }

  static get PostService(): PostService {
    if (!this.postServiceInstance) {
      this.postServiceInstance = new PostService();
    }

    return this.postServiceInstance;
  }

  static get SuggestionService(): SuggestionService {
    if (!this.suggestionServiceInstance) {
      this.suggestionServiceInstance = new SuggestionService();
    }

    return this.suggestionServiceInstance;
  }

  static get UserService(): UserService {
    if (!this.userServiceInstance) {
      this.userServiceInstance = new UserService();
    }

    return this.userServiceInstance;
  }

  static get ViewService(): ViewService {
    if (!this.viewServiceInstance) {
      this.viewServiceInstance = new ViewService();
    }

    return this.viewServiceInstance;
  }
}
