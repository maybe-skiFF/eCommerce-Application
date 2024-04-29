module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    // 'airbnb',
    // 'airbnb-typescript',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh', 'react'],
  parserOptions: {
    ecmaVersion: 'latest',
    ecmaFeatures: {
      jsx: true,
    },
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // 'import/no-extraneous-dependencies': ['error', { peerDependencies: true }],
    'import/prefer-default-export': ['off'],
    // 'react/no-restricted-strings': [
    //   'error',
    //   {
    //     message: 'Использование кириллических символов запрещено',
    //     patterns: ['с'],
    //   },
    // ],
  },
};
