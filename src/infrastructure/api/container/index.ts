import { LoginUseCase } from '../../../application/useCase/auth/login';
import { CreateCodeUseCase } from '../../../application/useCase/code/create';
import { CreatePostUseCase } from '../../../application/useCase/post/create/create';
import { DeletePostUseCase } from '../../../application/useCase/post/deleteById/delete';
import { FindAllPostUseCase } from '../../../application/useCase/post/findAll/post';
import { FindAllByMapAndAgentUseCase } from '../../../application/useCase/post/findAllByMapAndAgent/post';
import { FindAvailableAgentsUseCase } from '../../../application/useCase/post/findAvailableAgents/post';
import { FindAvailableMapsUseCase } from '../../../application/useCase/post/findAvailableMaps/post';
import { FindPostByIdOrThrowUseCase } from '../../../application/useCase/post/findByIdOrThrow';
import { UpdatePostUseCase } from '../../../application/useCase/post/update/upate';
import { CreateUserUseCase } from '../../../application/useCase/user/create/user';
import { DeleteUserByIdUseCase } from '../../../application/useCase/user/deleteById/user';
import { FindUserByIdUseCase } from '../../../application/useCase/user/findById/user';
import { UpdateUserUseCase } from '../../../application/useCase/user/update/user';
import { CreateViewUseCase } from '../../../application/useCase/views/add/View';
import { GetViewUseCase } from '../../../application/useCase/views/get/View';
import { CodeRepository } from '../../code/repository/mongo/codeRepository';
import { PostRepository } from '../../post/repository/mongo/postRepository';
import { PasswordHasher } from '../../services/PasswordHasher';
import { UserRepository } from '../../user/repository/mongo/userRepository';
import { ViewsRepository } from '../../views/repository/mongo/viewsRepository';
import { AuthController } from '../controllers/authController';
import { CodeController } from '../controllers/codeController';
import { PostController } from '../controllers/postController';
import { UserController } from '../controllers/userController';
import { ViewsController } from '../controllers/viewsController';

export class AppDependencyInjector {
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

  private static userRepositoryInstance: UserRepository;

  private static codeRepositoryInstance: CodeRepository;

  private static passwordHasherInstance: PasswordHasher;

  private static loginUseCaseInstance: LoginUseCase;

  static get loginUseCase(): LoginUseCase {
    if (!this.loginUseCaseInstance) {
      this.loginUseCaseInstance = new LoginUseCase(this.userRepository, this.passwordHasher);
    }

    return this.loginUseCaseInstance;
  }

  private static createPostUseCaseInstance: CreatePostUseCase;

  static get createPostUseCase(): CreatePostUseCase {
    if (!this.createPostUseCaseInstance) {
      this.createPostUseCaseInstance = new CreatePostUseCase(this.postRepository);
    }

    return this.createPostUseCaseInstance;
  }

  private static updatePostUseCaseInstance: UpdatePostUseCase;

  static get updatePostUseCase(): UpdatePostUseCase {
    if (!this.updatePostUseCaseInstance) {
      this.updatePostUseCaseInstance = new UpdatePostUseCase(this.postRepository);
    }

    return this.updatePostUseCaseInstance;
  }

  private static findPostByIdOrThrowUseCaseInstance: FindPostByIdOrThrowUseCase;

  static get findPostByIdOrThrowUseCase(): FindPostByIdOrThrowUseCase {
    if (!this.findPostByIdOrThrowUseCaseInstance) {
      this.findPostByIdOrThrowUseCaseInstance = new FindPostByIdOrThrowUseCase(this.postRepository);
    }

    return this.findPostByIdOrThrowUseCaseInstance;
  }

  private static findAvailableMapsUseCaseInstance: FindAvailableMapsUseCase;

  static get findAvailableMapsUseCase(): FindAvailableMapsUseCase {
    if (!this.findAvailableMapsUseCaseInstance) {
      this.findAvailableMapsUseCaseInstance = new FindAvailableMapsUseCase(this.postRepository);
    }

    return this.findAvailableMapsUseCaseInstance;
  }

  private static findAvailableAgentsUseCaseInstance: FindAvailableAgentsUseCase;

  static get findAvailableAgentsUseCase(): FindAvailableAgentsUseCase {
    if (!this.findAvailableAgentsUseCaseInstance) {
      this.findAvailableAgentsUseCaseInstance = new FindAvailableAgentsUseCase(this.postRepository);
    }

    return this.findAvailableAgentsUseCaseInstance;
  }

  private static findAllPostUseCaseInstance: FindAllPostUseCase;

  static get findAllPostUseCase(): FindAllPostUseCase {
    if (!this.findAllPostUseCaseInstance) {
      this.findAllPostUseCaseInstance = new FindAllPostUseCase(this.postRepository, this.userRepository);
    }

    return this.findAllPostUseCaseInstance;
  }

  private static findAllByMapAndAgentUseCaseInstance: FindAllByMapAndAgentUseCase;

  static get findAllByMapAndAgentUseCase(): FindAllByMapAndAgentUseCase {
    if (!this.findAllByMapAndAgentUseCaseInstance) {
      this.findAllByMapAndAgentUseCaseInstance = new FindAllByMapAndAgentUseCase(this.postRepository);
    }

    return this.findAllByMapAndAgentUseCaseInstance;
  }

  private static deletePostUseCaseInstance: DeletePostUseCase;

  static get deletePostUseCase(): DeletePostUseCase {
    if (!this.deletePostUseCaseInstance) {
      this.deletePostUseCaseInstance = new DeletePostUseCase(this.postRepository);
    }

    return this.deletePostUseCaseInstance;
  }

  private static postRepositoryInstance: PostRepository;

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
