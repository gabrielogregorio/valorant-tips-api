import { CodeRepositoryInterface } from '@/domain/code/repository/interface';
import { PostRepositoryInterface } from '@/domain/post/repository/postRepository.interface';
import { PasswordHasherInterface } from '@/domain/services/PasswordHasherInterface';
import { SuggestionRepositoryInterface } from '@/domain/suggestion/repository';
import { UserRepositoryInterface } from '@/domain/user/repository/userRepository.interface';
import { ViewsRepositoryInterface } from '@/domain/views/repository/interface';

import { AuthController } from '@/infrastructure/api/controllers/authController';
import { CodeController } from '@/infrastructure/api/controllers/codeController';
import { DashboardController } from '@/infrastructure/api/controllers/dashboardController';
import { AuthControllerInterface } from '@/infrastructure/api/controllers/interfaces/AuthControllerInterface';
import { CodeControllerInterface } from '@/infrastructure/api/controllers/interfaces/CodeControllerInterface';
import { DashboardControllerInterface } from '@/infrastructure/api/controllers/interfaces/DashboardControllerInterface';
import { PostControllerInterface } from '@/infrastructure/api/controllers/interfaces/PostControllerInterface';
import { SuggestionControllerInterface } from '@/infrastructure/api/controllers/interfaces/SuggestionControllerInterface';
import { UserControllerInterface } from '@/infrastructure/api/controllers/interfaces/UserControllerInterface';
import { ViewsControllerInterface } from '@/infrastructure/api/controllers/interfaces/ViewsControllerInterface';
import { PostController } from '@/infrastructure/api/controllers/postController';
import { SuggestionController } from '@/infrastructure/api/controllers/suggestionController';
import { UserController } from '@/infrastructure/api/controllers/userController';
import { ViewsController } from '@/infrastructure/api/controllers/viewsController';
import { CodeRepository } from '@/infrastructure/code/repository/mongo/codeRepository';
import { PostRepository } from '@/infrastructure/post/repository/mongo/postRepository';
import { PasswordHasher } from '@/infrastructure/services/PasswordHasher';
import { SuggestionRepository } from '@/infrastructure/suggestion/repository/mongo/suggestionRepository';
import { UserRepository } from '@/infrastructure/user/repository/mongo/userRepository';
import { ViewsRepository } from '@/infrastructure/views/repository/mongo/viewsRepository';

import { LoginUseCase } from '@/useCase/auth/login';
import { LoginUseCaseInterface } from '@/useCase/auth/login/LoginUseCaseInterface';
import { CreateCodeUseCase } from '@/useCase/code/create';
import { CreateCodeUseCaseInterface } from '@/useCase/code/create/CreateCodeUseCaseInterface';
import { DashboardUseCase } from '@/useCase/dashboard/get';
import { DashboardUseCaseInterface } from '@/useCase/dashboard/get/DashboardUseCaseInterface';
import { CreatePostUseCase } from '@/useCase/post/create';
import { CreatePostUseCaseInterface } from '@/useCase/post/create/CreatePostUseCaseInterface';
import { DeletePostUseCase } from '@/useCase/post/deleteById';
import { DeletePostUseCaseInterface } from '@/useCase/post/deleteById/DeletePostUseCaseInterface';
import { FindAllPostUseCase } from '@/useCase/post/findAll';
import { FindAllPostUseCaseInterface } from '@/useCase/post/findAll/FindAllPostUseCaseInterface';
import { FindAllByMapAndAgentUseCase } from '@/useCase/post/findAllByMapAndAgent';
import { FindAllByMapAndAgentUseCaseInterface } from '@/useCase/post/findAllByMapAndAgent/FindAllByMapAndAgentUseCaseInterface';
import { FindAvailableAgentsUseCase } from '@/useCase/post/findAvailableAgents';
import { FindAvailableAgentsUseCaseInterface } from '@/useCase/post/findAvailableAgents/FindAvailableAgentsUseCaseInterface';
import { FindAvailableMapsUseCase } from '@/useCase/post/findAvailableMaps';
import { FindAvailableMapsUseCaseInterface } from '@/useCase/post/findAvailableMaps/FindAvailableMapsUseCaseInterface';
import { FindPostByIdOrThrowUseCase } from '@/useCase/post/findByIdOrThrow';
import { FindPostByIdOrThrowUseCaseInterface } from '@/useCase/post/findByIdOrThrow/IFindPostByIdOrThrowUseCase';
import { UpdatePostUseCase } from '@/useCase/post/update';
import { UpdatePostUseCaseInterface } from '@/useCase/post/update/UpdatePostUseCaseInterface';
import { CreateSuggestionUseCase } from '@/useCase/suggestions/create';
import { CreateSuggestionUseCaseInterface } from '@/useCase/suggestions/create/createSuggestionUseCase';
import { DeleteSuggestionByIdUseCase } from '@/useCase/suggestions/deleteById';
import { DeleteSuggestionByIdUseCaseInterface } from '@/useCase/suggestions/deleteById/DeleteSuggestionByIdUseCaseInterface';
import { FindAllSuggestionsUseCase } from '@/useCase/suggestions/findAll';
import { FindAllSuggestionsUseCaseInterface } from '@/useCase/suggestions/findAll/FindAllSuggestionsUseCaseInterface';
import { UpdateSuggestionByIdUseCase } from '@/useCase/suggestions/updateById';
import { UpdateSuggestionByIdUseCaseInterface } from '@/useCase/suggestions/updateById/UpdateSuggestionByIdUseCaseInterface';
import { CreateUserUseCase } from '@/useCase/user/create';
import { CreateUserUseCaseInterface } from '@/useCase/user/create/CreateUserUseCaseInterface';
import { DeleteUserByIdUseCase } from '@/useCase/user/deleteById';
import { DeleteUserByIdUseCaseInterface } from '@/useCase/user/deleteById/DeleteUserByIdUseCaseInterface';
import { FindUserByIdUseCase } from '@/useCase/user/findById';
import { FindUserByIdUseCaseInterface } from '@/useCase/user/findById/FindUserByIdUseCaseInterface';
import { UpdateUserUseCase } from '@/useCase/user/update';
import { UpdateUserUseCaseInterface } from '@/useCase/user/update/UpdateUserUseCaseInterface';
import { CreateViewUseCase } from '@/useCase/views/add';
import { CreateViewUseCaseInterface } from '@/useCase/views/add/CreateViewUseCaseInterface';
import { GetViewUseCase } from '@/useCase/views/get';
import { GetViewUseCaseInterface } from '@/useCase/views/get/GetViewUseCaseInterface';

export class AppDependencyInjector {
  private static dashboardControllerInstance: DashboardControllerInterface;

  private static suggestionControllerInstance: SuggestionControllerInterface;

  private static postControllerInstance: PostControllerInterface;

  private static authControllerInstance: AuthControllerInterface;

  private static codeControllerInstance: CodeControllerInterface;

  private static viewsControllerInstance: ViewsControllerInterface;

  private static userControllerInstance: UserControllerInterface;

  private static createSuggestionUseCaseInstance: CreateSuggestionUseCaseInterface;

  private static findAllSuggestionsUseCaseInstance: FindAllSuggestionsUseCaseInterface;

  private static updateSuggestionByIdUseCaseInstance: UpdateSuggestionByIdUseCaseInterface;

  private static deleteSuggestionByIdUseCaseInstance: DeleteSuggestionByIdUseCaseInterface;

  private static suggestionRepositoryInstance: SuggestionRepositoryInterface;

  private static createViewUseCaseInstance: CreateViewUseCaseInterface;

  private static getViewUseCaseInstance: GetViewUseCaseInterface;

  private static viewRepositoryInstance: ViewsRepositoryInterface;

  private static createUserUseCaseInstance: CreateUserUseCaseInterface;

  private static updateUserUseCaseInstance: UpdateUserUseCaseInterface;

  private static findUserByIdUseCaseInstance: FindUserByIdUseCaseInterface;

  private static createCodeUseCaseInstance: CreateCodeUseCaseInterface;

  private static deleteUserByIdUseCaseInstance: DeleteUserByIdUseCaseInterface;

  private static userRepositoryInstance: UserRepositoryInterface;

  private static codeRepositoryInstance: CodeRepositoryInterface;

  private static passwordHasherInstance: PasswordHasherInterface;

  private static loginUseCaseInstance: LoginUseCaseInterface;

  private static createPostUseCaseInstance: CreatePostUseCaseInterface;

  private static updatePostUseCaseInstance: UpdatePostUseCaseInterface;

  private static findPostByIdOrThrowUseCaseInstance: FindPostByIdOrThrowUseCaseInterface;

  private static findAvailableMapsUseCaseInstance: FindAvailableMapsUseCaseInterface;

  private static findAvailableAgentsUseCaseInstance: FindAvailableAgentsUseCaseInterface;

  private static findAllPostUseCaseInstance: FindAllPostUseCaseInterface;

  private static findAllByMapAndAgentUseCaseInstance: FindAllByMapAndAgentUseCaseInterface;

  private static deletePostUseCaseInstance: DeletePostUseCaseInterface;

  private static postRepositoryInstance: PostRepositoryInterface;

  private static DashboardUseCaseInstance: DashboardUseCaseInterface;

  static get authController(): AuthControllerInterface {
    if (!this.authControllerInstance) {
      this.authControllerInstance = new AuthController(this.loginUseCase);
    }

    return this.authControllerInstance;
  }

  static get dashboardController(): DashboardControllerInterface {
    if (!this.dashboardControllerInstance) {
      this.dashboardControllerInstance = new DashboardController(this.DashboardUseCase);
    }

    return this.dashboardControllerInstance;
  }

  static get suggestionController(): SuggestionControllerInterface {
    if (!this.suggestionControllerInstance) {
      this.suggestionControllerInstance = new SuggestionController(
        this.createSuggestionUseCase,
        this.findAllSuggestionsUseCase,
        this.updateSuggestionByIdUseCase,
        this.deleteSuggestionByIdUseCase,
      );
    }
    return this.suggestionControllerInstance;
  }

  static get codeController(): CodeControllerInterface {
    if (!this.codeControllerInstance) {
      this.codeControllerInstance = new CodeController(this.createCodeUseCase);
    }

    return this.codeControllerInstance;
  }

  static get userController(): UserControllerInterface {
    if (!this.userControllerInstance) {
      this.userControllerInstance = new UserController(
        this.createUserUseCase,
        this.updateUserUseCase,
        this.findUserByIdUseCase,
        this.deleteUserByIdUseCase,
      );
    }
    return this.userControllerInstance;
  }

  static get viewsController(): ViewsControllerInterface {
    if (!this.viewsControllerInstance) {
      this.viewsControllerInstance = new ViewsController(this.createViewUseCase, this.getViewUseCase);
    }
    return this.viewsControllerInstance;
  }

  static get postController(): PostControllerInterface {
    if (!this.postControllerInstance) {
      this.postControllerInstance = new PostController(
        this.createPostUseCase,
        this.updatePostUseCase,
        this.findPostByIdOrThrowUseCase,
        this.findAvailableMapsUseCase,
        this.findAvailableAgentsUseCase,
        this.findAllPostUseCase,
        this.findAllByMapAndAgentUseCase,
        this.deletePostUseCase,
      );
    }

    return this.postControllerInstance;
  }

  static get DashboardUseCase(): DashboardUseCaseInterface {
    if (!this.DashboardUseCaseInstance) {
      this.DashboardUseCaseInstance = new DashboardUseCase(
        this.userRepository,
        this.postRepository,
        this.suggestionRepository,
        this.viewRepository,
      );
    }
    return this.DashboardUseCaseInstance;
  }

  static get suggestionRepository(): SuggestionRepositoryInterface {
    if (!this.suggestionRepositoryInstance) {
      this.suggestionRepositoryInstance = new SuggestionRepository();
    }
    return this.suggestionRepositoryInstance;
  }

  static get createSuggestionUseCase(): CreateSuggestionUseCaseInterface {
    if (!this.createSuggestionUseCaseInstance) {
      this.createSuggestionUseCaseInstance = new CreateSuggestionUseCase(
        this.suggestionRepository,
        this.postRepository,
      );
    }

    return this.createSuggestionUseCaseInstance;
  }

  static get findAllSuggestionsUseCase(): FindAllSuggestionsUseCaseInterface {
    if (!this.findAllSuggestionsUseCaseInstance) {
      this.findAllSuggestionsUseCaseInstance = new FindAllSuggestionsUseCase(this.suggestionRepository);
    }

    return this.findAllSuggestionsUseCaseInstance;
  }

  static get updateSuggestionByIdUseCase(): UpdateSuggestionByIdUseCaseInterface {
    if (!this.updateSuggestionByIdUseCaseInstance) {
      this.updateSuggestionByIdUseCaseInstance = new UpdateSuggestionByIdUseCase(this.suggestionRepository);
    }

    return this.updateSuggestionByIdUseCaseInstance;
  }

  static get deleteSuggestionByIdUseCase(): DeleteSuggestionByIdUseCaseInterface {
    if (!this.deleteSuggestionByIdUseCaseInstance) {
      this.deleteSuggestionByIdUseCaseInstance = new DeleteSuggestionByIdUseCase(this.suggestionRepository);
    }

    return this.deleteSuggestionByIdUseCaseInstance;
  }

  static get loginUseCase(): LoginUseCaseInterface {
    if (!this.loginUseCaseInstance) {
      this.loginUseCaseInstance = new LoginUseCase(this.userRepository, this.passwordHasher);
    }

    return this.loginUseCaseInstance;
  }

  static get createPostUseCase(): CreatePostUseCaseInterface {
    if (!this.createPostUseCaseInstance) {
      this.createPostUseCaseInstance = new CreatePostUseCase(this.postRepository, this.userRepository);
    }

    return this.createPostUseCaseInstance;
  }

  static get updatePostUseCase(): UpdatePostUseCaseInterface {
    if (!this.updatePostUseCaseInstance) {
      this.updatePostUseCaseInstance = new UpdatePostUseCase(this.postRepository, this.userRepository);
    }

    return this.updatePostUseCaseInstance;
  }

  static get findPostByIdOrThrowUseCase(): FindPostByIdOrThrowUseCaseInterface {
    if (!this.findPostByIdOrThrowUseCaseInstance) {
      this.findPostByIdOrThrowUseCaseInstance = new FindPostByIdOrThrowUseCase(
        this.postRepository,
        this.userRepository,
      );
    }

    return this.findPostByIdOrThrowUseCaseInstance;
  }

  static get findAvailableMapsUseCase(): FindAvailableMapsUseCaseInterface {
    if (!this.findAvailableMapsUseCaseInstance) {
      this.findAvailableMapsUseCaseInstance = new FindAvailableMapsUseCase(this.postRepository);
    }

    return this.findAvailableMapsUseCaseInstance;
  }

  static get findAvailableAgentsUseCase(): FindAvailableAgentsUseCaseInterface {
    if (!this.findAvailableAgentsUseCaseInstance) {
      this.findAvailableAgentsUseCaseInstance = new FindAvailableAgentsUseCase(this.postRepository);
    }

    return this.findAvailableAgentsUseCaseInstance;
  }

  static get findAllPostUseCase(): FindAllPostUseCaseInterface {
    if (!this.findAllPostUseCaseInstance) {
      this.findAllPostUseCaseInstance = new FindAllPostUseCase(this.postRepository, this.userRepository);
    }

    return this.findAllPostUseCaseInstance;
  }

  static get findAllByMapAndAgentUseCase(): FindAllByMapAndAgentUseCaseInterface {
    if (!this.findAllByMapAndAgentUseCaseInstance) {
      this.findAllByMapAndAgentUseCaseInstance = new FindAllByMapAndAgentUseCase(
        this.postRepository,
        this.userRepository,
      );
    }

    return this.findAllByMapAndAgentUseCaseInstance;
  }

  static get deletePostUseCase(): DeletePostUseCaseInterface {
    if (!this.deletePostUseCaseInstance) {
      this.deletePostUseCaseInstance = new DeletePostUseCase(this.postRepository);
    }

    return this.deletePostUseCaseInstance;
  }

  static get postRepository(): PostRepositoryInterface {
    if (!this.postRepositoryInstance) {
      this.postRepositoryInstance = new PostRepository();
    }

    return this.postRepositoryInstance;
  }

  static get userRepository(): UserRepositoryInterface {
    if (!this.userRepositoryInstance) {
      this.userRepositoryInstance = new UserRepository();
    }
    return this.userRepositoryInstance;
  }

  static get codeRepository(): CodeRepositoryInterface {
    if (!this.codeRepositoryInstance) {
      this.codeRepositoryInstance = new CodeRepository();
    }
    return this.codeRepositoryInstance;
  }

  static get createCodeUseCase(): CreateCodeUseCaseInterface {
    if (!this.createCodeUseCaseInstance) {
      this.createCodeUseCaseInstance = new CreateCodeUseCase(this.codeRepository);
    }

    return this.createCodeUseCaseInstance;
  }

  static get passwordHasher(): PasswordHasherInterface {
    if (!this.passwordHasherInstance) {
      this.passwordHasherInstance = new PasswordHasher();
    }
    return this.passwordHasherInstance;
  }

  static get createUserUseCase(): CreateUserUseCaseInterface {
    if (!this.createUserUseCaseInstance) {
      this.createUserUseCaseInstance = new CreateUserUseCase(
        this.userRepository,
        this.codeRepository,
        this.passwordHasher,
      );
    }
    return this.createUserUseCaseInstance;
  }

  static get updateUserUseCase(): UpdateUserUseCaseInterface {
    if (!this.updateUserUseCaseInstance) {
      this.updateUserUseCaseInstance = new UpdateUserUseCase(this.userRepository, this.passwordHasher);
    }
    return this.updateUserUseCaseInstance;
  }

  static get findUserByIdUseCase(): FindUserByIdUseCaseInterface {
    if (!this.findUserByIdUseCaseInstance) {
      this.findUserByIdUseCaseInstance = new FindUserByIdUseCase(this.userRepository);
    }
    return this.findUserByIdUseCaseInstance;
  }

  static get deleteUserByIdUseCase(): DeleteUserByIdUseCaseInterface {
    if (!this.deleteUserByIdUseCaseInstance) {
      this.deleteUserByIdUseCaseInstance = new DeleteUserByIdUseCase(this.userRepository);
    }
    return this.deleteUserByIdUseCaseInstance;
  }

  static get viewRepository(): ViewsRepositoryInterface {
    if (!this.viewRepositoryInstance) {
      this.viewRepositoryInstance = new ViewsRepository();
    }
    return this.viewRepositoryInstance;
  }

  static get createViewUseCase(): CreateViewUseCaseInterface {
    if (!this.createViewUseCaseInstance) {
      this.createViewUseCaseInstance = new CreateViewUseCase(this.viewRepository);
    }
    return this.createViewUseCaseInstance;
  }

  static get getViewUseCase(): GetViewUseCaseInterface {
    if (!this.getViewUseCaseInstance) {
      this.getViewUseCaseInstance = new GetViewUseCase(this.viewRepository);
    }

    return this.getViewUseCaseInstance;
  }
}
