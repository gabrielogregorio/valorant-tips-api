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
          '@/controllers': './src/controllers',
          '@/factories': './src/factories',
          '@/middlewares': './src/middlewares',
          '@/config': './src/config',
          '@/models': './src/models',
          '@/shared': './src/shared',
          '@/database': './src/database',
          '@/errors': './src/errors',
          '@/service': './src/service',
          '@/test': './src/test',
          '@/logs': './src/logs',
          '@/repositories': './src/repositories',
          '@/interfaces': './src/interfaces',
          '@/mock': './src/mock',
          '@/locales': './src/locales',
          '@/helpers': './src/helpers',
          '@/schemas': './src/schemas',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
