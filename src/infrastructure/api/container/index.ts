import { LoginUseCase } from '../../../application/useCase/auth/login';
import { LoginUseCaseInterface } from '../../../application/useCase/auth/login/LoginUseCaseInterface';
import { CreateCodeUseCase } from '../../../application/useCase/code/create';
import { CreateCodeUseCaseInterface } from '../../../application/useCase/code/create/CreateCodeUseCaseInterface';
import { InsightsUseCase } from '../../../application/useCase/dashboard/insights';
import { InsightsUseCaseInterface } from '../../../application/useCase/dashboard/insights/InsightsUseCaseInterface';
import { CreatePostUseCase } from '../../../application/useCase/post/create';
import { CreatePostUseCaseInterface } from '../../../application/useCase/post/create/CreatePostUseCaseInterface';
import { DeletePostUseCase } from '../../../application/useCase/post/deleteById';
import { DeletePostUseCaseInterface } from '../../../application/useCase/post/deleteById/DeletePostUseCaseInterface';
import { FindAllPostUseCaseInterface } from '../../../application/useCase/post/findAll/FindAllPostUseCaseInterface';
import { FindAllPostUseCase } from '../../../application/useCase/post/findAll';
import { FindAllByMapAndAgentUseCaseInterface } from '../../../application/useCase/post/findAllByMapAndAgent/FindAllByMapAndAgentUseCaseInterface';
import { FindAllByMapAndAgentUseCase } from '../../../application/useCase/post/findAllByMapAndAgent';
import { FindAvailableAgentsUseCaseInterface } from '../../../application/useCase/post/findAvailableAgents/FindAvailableAgentsUseCaseInterface';
import { FindAvailableAgentsUseCase } from '../../../application/useCase/post/findAvailableAgents';
import { FindAvailableMapsUseCaseInterface } from '../../../application/useCase/post/findAvailableMaps/FindAvailableMapsUseCaseInterface';
import { FindAvailableMapsUseCase } from '../../../application/useCase/post/findAvailableMaps';
import { FindPostByIdOrThrowUseCase } from '../../../application/useCase/post/findByIdOrThrow';
import { FindPostByIdOrThrowUseCaseInterface } from '../../../application/useCase/post/findByIdOrThrow/IFindPostByIdOrThrowUseCase';
import { UpdatePostUseCase } from '../../../application/useCase/post/update';
import { UpdatePostUseCaseInterface } from '../../../application/useCase/post/update/UpdatePostUseCaseInterface';
import { CreateSuggestionUseCase } from '../../../application/useCase/suggestions/create';
import { CreateSuggestionUseCaseInterface } from '../../../application/useCase/suggestions/create/createSuggestionUseCase';
import { DeleteSuggestionByIdUseCaseInterface } from '../../../application/useCase/suggestions/deleteById/DeleteSuggestionByIdUseCaseInterface';
import { DeleteSuggestionByIdUseCase } from '../../../application/useCase/suggestions/deleteById';
import { FindAllSuggestionsUseCase } from '../../../application/useCase/suggestions/findAll';
import { FindAllSuggestionsUseCaseInterface } from '../../../application/useCase/suggestions/findAll/FindAllSuggestionsUseCaseInterface';
import { UpdateSuggestionByIdUseCase } from '../../../application/useCase/suggestions/updateById';
import { UpdateSuggestionByIdUseCaseInterface } from '../../../application/useCase/suggestions/updateById/UpdateSuggestionByIdUseCaseInterface';
import { CreateUserUseCaseInterface } from '../../../application/useCase/user/create/CreateUserUseCaseInterface';
import { CreateUserUseCase } from '../../../application/useCase/user/create';
import { DeleteUserByIdUseCaseInterface } from '../../../application/useCase/user/deleteById/DeleteUserByIdUseCaseInterface';
import { DeleteUserByIdUseCase } from '../../../application/useCase/user/deleteById';
import { FindUserByIdUseCaseInterface } from '../../../application/useCase/user/findById/FindUserByIdUseCaseInterface';
import { FindUserByIdUseCase } from '../../../application/useCase/user/findById';
import { UpdateUserUseCaseInterface } from '../../../application/useCase/user/update/UpdateUserUseCaseInterface';
import { UpdateUserUseCase } from '../../../application/useCase/user/update';
import { CreateViewUseCaseInterface } from '../../../application/useCase/views/add/CreateViewUseCaseInterface';
import { CreateViewUseCase } from '../../../application/useCase/views/add';
import { GetViewUseCaseInterface } from '../../../application/useCase/views/get/GetViewUseCaseInterface';
import { GetViewUseCase } from '../../../application/useCase/views/get';
import { CodeRepositoryInterface } from '../../../domain/code/repository/inteface';
import { PostRepositoryInterface } from '../../../domain/post/repository/postRepository.interface';
import { PasswordHasherInterface } from '../../../domain/services/PasswordHasherInterface';
import { SuggestionRepositoryInterface } from '../../../domain/suggestion/repository';
import { UserRepositoryInterface } from '../../../domain/user/repository/userRepository.interface';
import { ViewsRepositoryInterface } from '../../../domain/views/repository/inteface';
import { CodeRepository } from '../../code/repository/mongo/codeRepository';
import { PostRepository } from '../../post/repository/mongo/postRepository';
import { PasswordHasher } from '../../services/PasswordHasher';
import { SuggestionRepository } from '../../suggestion/repository/mongo/suggestionRepository';
import { UserRepository } from '../../user/repository/mongo/userRepository';
import { ViewsRepository } from '../../views/repository/mongo/viewsRepository';
import { AuthController } from '../controllers/authController';
import { CodeController } from '../controllers/codeController';
import { DashboardController } from '../controllers/dashboardController';
import { PostController } from '../controllers/postController';
import { SuggestionController } from '../controllers/suggestionController';
import { UserController } from '../controllers/userController';
import { ViewsController } from '../controllers/viewsController';

export class AppDependencyInjector {
  // começo api
  private static dashboardControllerInstance: DashboardController;

  private static suggestionControllerInstance: SuggestionController;

  private static postControllerInstance: PostController;

  private static authControllerInstance: AuthController;

  private static codeControllerInstance: CodeController;

  private static viewsControllerInstance: ViewsController;

  private static userControllerInstance: UserController;

  // fim api
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

  private static insightsUseCaseInstance: InsightsUseCaseInterface;

  // COMEÇO: CAMADA API
  static get authController(): AuthController {
    if (!this.authControllerInstance) {
      this.authControllerInstance = new AuthController(this.loginUseCase);
    }

    return this.authControllerInstance;
  }

  static get dashboardController(): DashboardController {
    if (!this.dashboardControllerInstance) {
      this.dashboardControllerInstance = new DashboardController(this.insightsUseCase);
    }

    return this.dashboardControllerInstance;
  }

  static get suggestionController(): SuggestionController {
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

  static get codeController(): CodeController {
    if (!this.codeControllerInstance) {
      this.codeControllerInstance = new CodeController(this.createCodeUseCase);
    }

    return this.codeControllerInstance;
  }

  static get userController(): UserController {
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

  static get viewsController(): ViewsController {
    if (!this.viewsControllerInstance) {
      this.viewsControllerInstance = new ViewsController(this.createViewUseCase, this.getViewUseCase);
    }
    return this.viewsControllerInstance;
  }

  static get postController(): PostController {
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
  // FIM: CAMADA API

  static get insightsUseCase(): InsightsUseCaseInterface {
    if (!this.insightsUseCaseInstance) {
      this.insightsUseCaseInstance = new InsightsUseCase(
        this.userRepository,
        this.postRepository,
        this.suggestionRepository,
        this.viewRepository,
      );
    }
    return this.insightsUseCaseInstance;
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
      this.createUserUseCaseInstance = new CreateUserUseCase(this.userRepository, this.codeRepository);
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
