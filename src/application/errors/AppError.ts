type codeErrors =
  | 'USERNAME_ALREADY_EXISTS'
  | 'POST_NOT_EXISTS'
  | 'NO_CAN_DELETE_POST_ANOTHER_USER'
  | 'INVALID_PASSWORD'
  | 'CODE_IS_NOT_AVAILABLE'
  | 'USER_NOT_FOUND'
  | 'SUGGESTION_NOT_FOUND'
  | 'INTERNAL_ERROR';

export class AppError {
  public code: codeErrors;

  constructor(code: codeErrors) {
    this.code = code;
  }
}
