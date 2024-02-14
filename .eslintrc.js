module.exports = {
  parser: '@typescript-eslint/parser',
  extends: ['eslint:recommended', 'plugin:prettier/recommended', 'prettier'],
  plugins: ['@typescript-eslint'],
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
  env: {
    es6: true,
    node: true,
  },
  rules: {
    'no-var': 'error',
    semi: 'error',
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-multi-spaces': 'error',
    'space-in-parens': 'error',
    'no-multiple-empty-lines': 'error',
    'prefer-const': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
  },
};
