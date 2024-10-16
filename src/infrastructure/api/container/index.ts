import { LoginUseCase } from '../../../application/useCase/auth/login';
import { CreateCodeUseCase } from '../../../application/useCase/code/create';
import { InsightsUseCase } from '../../../application/useCase/dashboard/insights';
import { CreatePostUseCase } from '../../../application/useCase/post/create/create';
import { DeletePostUseCase } from '../../../application/useCase/post/deleteById/delete';
import { FindAllPostUseCase } from '../../../application/useCase/post/findAll/post';
import { FindAllByMapAndAgentUseCase } from '../../../application/useCase/post/findAllByMapAndAgent/post';
import { FindAvailableAgentsUseCase } from '../../../application/useCase/post/findAvailableAgents/post';
import { FindAvailableMapsUseCase } from '../../../application/useCase/post/findAvailableMaps/post';
import { FindPostByIdOrThrowUseCase } from '../../../application/useCase/post/findByIdOrThrow';
import { UpdatePostUseCase } from '../../../application/useCase/post/update/upate';
import { CreateSuggestionUseCase } from '../../../application/useCase/suggestions/create';
import { DeleteSuggestionByIdUseCase } from '../../../application/useCase/suggestions/deleteById/suggestion';
import { FindAllSuggestionsUseCase } from '../../../application/useCase/suggestions/findAll/findAll';
import { UpdateSuggestionByIdUseCase } from '../../../application/useCase/suggestions/updateById/updateById';
import { CreateUserUseCase } from '../../../application/useCase/user/create/user';
import { DeleteUserByIdUseCase } from '../../../application/useCase/user/deleteById/user';
import { FindUserByIdUseCase } from '../../../application/useCase/user/findById/user';
import { UpdateUserUseCase } from '../../../application/useCase/user/update/user';
import { CreateViewUseCase } from '../../../application/useCase/views/add/View';
import { GetViewUseCase } from '../../../application/useCase/views/get/View';
import { UserRepositoryInterface } from '../../../domain/user/repository/userRepository.interface';
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
  private static dashboardControllerInstance: DashboardController;

  private static suggestionControllerInstance: SuggestionController;

  private static createSuggestionUseCaseInstance: CreateSuggestionUseCase;

  private static findAllSuggestionsUseCaseInstance: FindAllSuggestionsUseCase;

  private static updateSuggestionByIdUseCaseInstance: UpdateSuggestionByIdUseCase;

  private static deleteSuggestionByIdUseCaseInstance: DeleteSuggestionByIdUseCase;

  private static suggestionRepositoryInstance: SuggestionRepository;

  private static createViewUseCaseInstance: CreateViewUseCase;

  private static postControllerInstance: PostController;

  private static authControllerInstance: AuthController;

  private static getViewUseCaseInstance: GetViewUseCase;

  private static codeControllerInstance: CodeController;

  private static viewsControllerInstance: ViewsController;

  private static userControllerInstance: UserController;

  private static viewRepositoryInstance: ViewsRepository;

  private static createUserUseCaseInstance: CreateUserUseCase;

  private static updateUserUseCaseInstance: UpdateUserUseCase;

  private static findUserByIdUseCaseInstance: FindUserByIdUseCase;

  private static createCodeUseCaseInstance: CreateCodeUseCase;

  private static deleteUserByIdUseCaseInstance: DeleteUserByIdUseCase;

  private static userRepositoryInstance: UserRepositoryInterface;

  private static codeRepositoryInstance: CodeRepository;

  private static passwordHasherInstance: PasswordHasher;

  private static loginUseCaseInstance: LoginUseCase;

  private static createPostUseCaseInstance: CreatePostUseCase;

  private static updatePostUseCaseInstance: UpdatePostUseCase;

  private static findPostByIdOrThrowUseCaseInstance: FindPostByIdOrThrowUseCase;

  private static findAvailableMapsUseCaseInstance: FindAvailableMapsUseCase;

  private static findAvailableAgentsUseCaseInstance: FindAvailableAgentsUseCase;

  private static findAllPostUseCaseInstance: FindAllPostUseCase;

  private static findAllByMapAndAgentUseCaseInstance: FindAllByMapAndAgentUseCase;

  private static deletePostUseCaseInstance: DeletePostUseCase;

  private static postRepositoryInstance: PostRepository;

  private static insightsUseCaseInstance: InsightsUseCase;

  static get insightsUseCase(): InsightsUseCase {
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

  static get suggestionRepository(): SuggestionRepository {
    if (!this.suggestionRepositoryInstance) {
      this.suggestionRepositoryInstance = new SuggestionRepository();
    }
    return this.suggestionRepositoryInstance;
  }

  static get createSuggestionUseCase(): CreateSuggestionUseCase {
    if (!this.createSuggestionUseCaseInstance) {
      this.createSuggestionUseCaseInstance = new CreateSuggestionUseCase(
        this.suggestionRepository,
        this.postRepository,
      );
    }

    return this.createSuggestionUseCaseInstance;
  }

  static get findAllSuggestionsUseCase(): FindAllSuggestionsUseCase {
    if (!this.findAllSuggestionsUseCaseInstance) {
      this.findAllSuggestionsUseCaseInstance = new FindAllSuggestionsUseCase(this.suggestionRepository);
    }

    return this.findAllSuggestionsUseCaseInstance;
  }

  static get updateSuggestionByIdUseCase(): UpdateSuggestionByIdUseCase {
    if (!this.updateSuggestionByIdUseCaseInstance) {
      this.updateSuggestionByIdUseCaseInstance = new UpdateSuggestionByIdUseCase(this.suggestionRepository);
    }

    return this.updateSuggestionByIdUseCaseInstance;
  }

  static get deleteSuggestionByIdUseCase(): DeleteSuggestionByIdUseCase {
    if (!this.deleteSuggestionByIdUseCaseInstance) {
      this.deleteSuggestionByIdUseCaseInstance = new DeleteSuggestionByIdUseCase(this.suggestionRepository);
    }

    return this.deleteSuggestionByIdUseCaseInstance;
  }

  static get loginUseCase(): LoginUseCase {
    if (!this.loginUseCaseInstance) {
      this.loginUseCaseInstance = new LoginUseCase(this.userRepository, this.passwordHasher);
    }

    return this.loginUseCaseInstance;
  }

  static get createPostUseCase(): CreatePostUseCase {
    if (!this.createPostUseCaseInstance) {
      this.createPostUseCaseInstance = new CreatePostUseCase(this.postRepository);
    }

    return this.createPostUseCaseInstance;
  }

  static get updatePostUseCase(): UpdatePostUseCase {
    if (!this.updatePostUseCaseInstance) {
      this.updatePostUseCaseInstance = new UpdatePostUseCase(this.postRepository);
    }

    return this.updatePostUseCaseInstance;
  }

  static get findPostByIdOrThrowUseCase(): FindPostByIdOrThrowUseCase {
    if (!this.findPostByIdOrThrowUseCaseInstance) {
      this.findPostByIdOrThrowUseCaseInstance = new FindPostByIdOrThrowUseCase(this.postRepository);
    }

    return this.findPostByIdOrThrowUseCaseInstance;
  }

  static get findAvailableMapsUseCase(): FindAvailableMapsUseCase {
    if (!this.findAvailableMapsUseCaseInstance) {
      this.findAvailableMapsUseCaseInstance = new FindAvailableMapsUseCase(this.postRepository);
    }

    return this.findAvailableMapsUseCaseInstance;
  }

  static get findAvailableAgentsUseCase(): FindAvailableAgentsUseCase {
    if (!this.findAvailableAgentsUseCaseInstance) {
      this.findAvailableAgentsUseCaseInstance = new FindAvailableAgentsUseCase(this.postRepository);
    }

    return this.findAvailableAgentsUseCaseInstance;
  }

  static get findAllPostUseCase(): FindAllPostUseCase {
    if (!this.findAllPostUseCaseInstance) {
      this.findAllPostUseCaseInstance = new FindAllPostUseCase(this.postRepository, this.userRepository);
    }

    return this.findAllPostUseCaseInstance;
  }

  static get findAllByMapAndAgentUseCase(): FindAllByMapAndAgentUseCase {
    if (!this.findAllByMapAndAgentUseCaseInstance) {
      this.findAllByMapAndAgentUseCaseInstance = new FindAllByMapAndAgentUseCase(
        this.postRepository,
        this.userRepository,
      );
    }

    return this.findAllByMapAndAgentUseCaseInstance;
  }

  static get deletePostUseCase(): DeletePostUseCase {
    if (!this.deletePostUseCaseInstance) {
      this.deletePostUseCaseInstance = new DeletePostUseCase(this.postRepository);
    }

    return this.deletePostUseCaseInstance;
  }

  static get postRepository(): PostRepository {
    if (!this.postRepositoryInstance) {
      this.postRepositoryInstance = new PostRepository();
    }

    return this.postRepositoryInstance;
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

  static get authController(): AuthController {
    if (!this.authControllerInstance) {
      this.authControllerInstance = new AuthController(this.loginUseCase);
    }

    return this.authControllerInstance;
  }

  static get userRepository(): UserRepositoryInterface {
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

  static get createCodeUseCase(): CreateCodeUseCase {
    if (!this.createCodeUseCaseInstance) {
      this.createCodeUseCaseInstance = new CreateCodeUseCase(this.codeRepository);
    }

    return this.createCodeUseCaseInstance;
  }

  static get codeController(): CodeController {
    if (!this.codeControllerInstance) {
      this.codeControllerInstance = new CodeController(this.createCodeUseCase);
    }

    return this.codeControllerInstance;
  }

  static get passwordHasher(): PasswordHasher {
    if (!this.passwordHasherInstance) {
      this.passwordHasherInstance = new PasswordHasher();
    }
    return this.passwordHasherInstance;
  }

  static get createUserUseCase(): CreateUserUseCase {
    if (!this.createUserUseCaseInstance) {
      this.createUserUseCaseInstance = new CreateUserUseCase(this.userRepository, this.codeRepository);
    }
    return this.createUserUseCaseInstance;
  }

  static get updateUserUseCase(): UpdateUserUseCase {
    if (!this.updateUserUseCaseInstance) {
      this.updateUserUseCaseInstance = new UpdateUserUseCase(this.userRepository, this.passwordHasher);
    }
    return this.updateUserUseCaseInstance;
  }

  static get findUserByIdUseCase(): FindUserByIdUseCase {
    if (!this.findUserByIdUseCaseInstance) {
      this.findUserByIdUseCaseInstance = new FindUserByIdUseCase(this.userRepository);
    }
    return this.findUserByIdUseCaseInstance;
  }

  static get deleteUserByIdUseCase(): DeleteUserByIdUseCase {
    if (!this.deleteUserByIdUseCaseInstance) {
      this.deleteUserByIdUseCaseInstance = new DeleteUserByIdUseCase(this.userRepository);
    }
    return this.deleteUserByIdUseCaseInstance;
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

  static get viewRepository(): ViewsRepository {
    if (!this.viewRepositoryInstance) {
      this.viewRepositoryInstance = new ViewsRepository();
    }
    return this.viewRepositoryInstance;
  }

  static get createViewUseCase(): CreateViewUseCase {
    if (!this.createViewUseCaseInstance) {
      this.createViewUseCaseInstance = new CreateViewUseCase(this.viewRepository);
    }
    return this.createViewUseCaseInstance;
  }

  static get getViewUseCase(): GetViewUseCase {
    if (!this.getViewUseCaseInstance) {
      this.getViewUseCaseInstance = new GetViewUseCase(this.viewRepository);
    }

    return this.getViewUseCaseInstance;
  }

  static get viewsController(): ViewsController {
    if (!this.viewsControllerInstance) {
      this.viewsControllerInstance = new ViewsController(this.createViewUseCase, this.getViewUseCase);
    }
    return this.viewsControllerInstance;
  }
}
