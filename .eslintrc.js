module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  ignorePatterns: [
    'build/',
    'node_modules/',
    '.pnp.cjs',
    '.pnp.loader.cjs',
    'public/',
  ],
  extends: [
    'airbnb',
    'eslint:recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react/recommended',
  ],
  plugins: [
    // set your plugins
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-typescript',
        'plugin:@typescript-eslint/recommended',
      ],
      plugins: [
        '@typescript-eslint',
      ],
      rules: {
        // set your typescript rules
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
    },
    {
      files: ['src/hooks/**/**/*.test.ts?(x)'],
      rules: {
        'react-hooks/rules-of-hooks': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react', 'plugin:jest/recommended'],
      rules: {
        // set your test eslint rules
      },
    },
  ],
  rules: {
    // set your rules
  },
};
