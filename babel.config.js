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
          '@/models': './src/models',
          '@/service': './src/service',
          '@/mock': './src/mock',
        },
      },
    ],
  ],
  ignore: ['**/*.spec.ts', '**/*.test.ts'],
};
