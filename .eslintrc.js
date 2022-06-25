const { readGitignoreFiles } = require('eslint-gitignore');
const gitignore = readGitignoreFiles({ cwd: __dirname });

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort',
    'unused-imports',
  ],
  ignorePatterns: [...gitignore, '.eslintrc.js'],
  rules: {
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off',
    'no-void': [
      'error',
      {
        allowAsStatement: true,
      },
    ],
    'react/function-component-definition': [
      'error',
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'arrow-body-style': 'off',
    // eslint-plugin-simple-import-sort
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    // eslint-plugin-unused-imports
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'unused-imports/no-unused-imports': 'error',
    'unused-imports/no-unused-vars': [
      'warn',
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_',
      },
    ],
    // redux-toolkit
    'no-param-reassign': [
      'error',
      { props: true, ignorePropertyModificationsFor: ['state'] },
    ],
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
      typescript: {},
    },
  },
};

/* ----------------------------------- 参考 ----------------------------------- */

// ESLintでimport文を自動で並べ替える
// https://sunday-morning.app/posts/2020-10-31-eslint-import-auto-sort

// eslint-plugin-unused-imports
// https://www.npmjs.com/package/eslint-plugin-unused-imports
