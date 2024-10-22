import { modelsI18nType } from '@/infrastructure/config/i18nInterface';

export const translationErrorsResources: modelsI18nType = {
  en: {
    USERNAME_ALREADY_EXISTS: "Username '{{username}}' already exists",
    POST_NOT_EXISTS: "Post '{postId}' not exists",
    NO_CAN_DELETE_POST_ANOTHER_USER: 'You not can delete post another user',
    INVALID_PASSWORD: 'Password is invalid',
    CODE_IS_NOT_AVAILABLE: 'code is not available',
    USER_NOT_FOUND: "User '{{username}}' not found",
    USER_ID_NOT_FOUND: "UserId '{{id}}' not found",
    SUGGESTION_NOT_FOUND: 'Suggestion not found',
    INTERNAL_ERROR: 'Internal Server Error',
    UNKNOWN_ERROR: 'Error not mapped',
  },

  'pt-br': {
    USERNAME_ALREADY_EXISTS: "Usuário '{{username}}' já existe",
    POST_NOT_EXISTS: "Post '{postId}' não existe",
    NO_CAN_DELETE_POST_ANOTHER_USER: 'Você não pode deletar um post de outro usuário',
    INVALID_PASSWORD: 'Senha é invalida',
    CODE_IS_NOT_AVAILABLE: 'Código não está disponível',
    USER_NOT_FOUND: "Usuário '{{username}}' não existe",
    USER_ID_NOT_FOUND: "Usuário id '{{id}}' não existe",
    SUGGESTION_NOT_FOUND: 'Sugestão não encontrada',
    INTERNAL_ERROR: 'Internal Server Error',
    UNKNOWN_ERROR: 'Error not mapped',
  },
};
