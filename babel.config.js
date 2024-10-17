module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@/controllers': './src/infrastructure/api/controllers',
          '@/factories': './src/infrastructure/api/factories',
          '@/middlewares': './src/infrastructure/api/middlewares',
          '@/config': './src/infrastructure/api/config',
          '@/models': './src/infrastructure/api/models',
          '@/wrappers': './src/infrastructure/api/wrappers',
          '@/database': './src/infrastructure/api/database',
          '@/errors': './src/infrastructure/api/errors',
          '@/service': './src/infrastructure/api/service',
          '@/test': './src/infrastructure/api/test',
          '@/logs': './src/infrastructure/api/logs',
          '@/repositories': './src/infrastructure/api/repositories',
          '@/interfaces': './src/infrastructure/api/interfaces',
          '@/mock': './src/infrastructure/api/mock',
          '@/locales': './src/infrastructure/api/locales',
          '@/helpers': './src/infrastructure/api/helpers',
          '@/schemas': './src/infrastructure/api/schemas',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
