import { CodeController } from '@/controllers/codeController';
import { DashboardController } from '@/controllers/dashboardController';
import { PostController } from '@/controllers/postController';
import { SuggestionController } from '@/controllers/suggestionController';
import { UserController } from '@/controllers/userController';
import { ViewsController } from '@/controllers/viewsController';
import { CodeRepository } from '@/repositories/codeRepository';
import { PostRepository } from '@/repositories/postRepository';
import { ViewsRepository } from '@/repositories/viewsRepository';
import { CodeService } from '@/service/Code';
import { ViewService } from '@/service/View';
import { DashboardService } from '@/service/dashboard';
import { PostService } from '@/service/post';
import { SuggestionService } from '@/service/suggestion';
import { UserService } from '@/service/user';
import { SuggestionRepository } from '@/repositories/suggestionRepository';
import { UserRepository } from '@/repositories/userRepository';

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

  private static suggestionRepositoryInstance: SuggestionRepository;

  private static userRepositoryInstance: UserRepository;

  private static codeRepositoryInstance: CodeRepository;

  private static postRepositoryInstance: PostRepository;

  private static viewsRepositoryInstance: ViewsRepository;

  static get userController(): UserController {
    if (!this.userControllerInstance) {
      this.userControllerInstance = new UserController(this.codeService, this.userService);
    }
    return this.userControllerInstance;
  }

  static get postController(): PostController {
    if (!this.postControllerInstance) {
      this.postControllerInstance = new PostController(this.postService);
    }
    return this.postControllerInstance;
  }

  static get suggestionController(): SuggestionController {
    if (!this.suggestionControllerInstance) {
      this.suggestionControllerInstance = new SuggestionController(this.suggestionService);
    }
    return this.suggestionControllerInstance;
  }

  static get codeController(): CodeController {
    if (!this.codeControllerInstance) {
      this.codeControllerInstance = new CodeController(this.codeService);
    }
    return this.codeControllerInstance;
  }

  static get dashboardController(): DashboardController {
    if (!this.dashboardControllerInstance) {
      this.dashboardControllerInstance = new DashboardController(this.dashboardService);
    }
    return this.dashboardControllerInstance;
  }

  static get viewsController(): ViewsController {
    if (!this.viewsControllerInstance) {
      this.viewsControllerInstance = new ViewsController(this.viewService);
    }
    return this.viewsControllerInstance;
  }

  static get codeService(): CodeService {
    if (!this.codeServiceInstance) {
      this.codeServiceInstance = new CodeService(this.codeRepository);
    }
    return this.codeServiceInstance;
  }

  static get dashboardService(): DashboardService {
    if (!this.dashboardServiceInstance) {
      this.dashboardServiceInstance = new DashboardService(
        this.userRepository,
        this.postRepository,
        this.suggestionRepository,
        this.viewsRepository,
      );
    }

    return this.dashboardServiceInstance;
  }

  static get postService(): PostService {
    if (!this.postServiceInstance) {
      this.postServiceInstance = new PostService(this.postRepository);
    }

    return this.postServiceInstance;
  }

  static get suggestionService(): SuggestionService {
    if (!this.suggestionServiceInstance) {
      this.suggestionServiceInstance = new SuggestionService(this.suggestionRepository, this.postService);
    }

    return this.suggestionServiceInstance;
  }

  static get userService(): UserService {
    if (!this.userServiceInstance) {
      this.userServiceInstance = new UserService(this.userRepository);
    }

    return this.userServiceInstance;
  }

  static get viewService(): ViewService {
    if (!this.viewServiceInstance) {
      this.viewServiceInstance = new ViewService(this.viewsRepository);
    }

    return this.viewServiceInstance;
  }

  static get suggestionRepository(): SuggestionRepository {
    if (!this.suggestionRepositoryInstance) {
      this.suggestionRepositoryInstance = new SuggestionRepository();
    }

    return this.suggestionRepositoryInstance;
  }

  static get userRepository(): UserRepository {
    if (!this.userRepositoryInstance) {
      this.userRepositoryInstance = new UserRepository();
    }

    return this.userRepositoryInstance;
  }

  static get codeRepository(): CodeRepository {
    if (!this.codeRepositoryInstance) {
      this.codeRepositoryInstance = new CodeRepository();
    }

    return this.codeRepositoryInstance;
  }

  static get postRepository(): PostRepository {
    if (!this.postRepositoryInstance) {
      this.postRepositoryInstance = new PostRepository();
    }

    return this.postRepositoryInstance;
  }

  static get viewsRepository(): ViewsRepository {
    if (!this.viewsRepositoryInstance) {
      this.viewsRepositoryInstance = new ViewsRepository();
    }

    return this.viewsRepositoryInstance;
  }
}
