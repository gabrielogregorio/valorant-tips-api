export type languageMapsType = 'en' | 'pt-br';

export type modelsI18nType = { [key in languageMapsType]: { [key: string]: string } };
