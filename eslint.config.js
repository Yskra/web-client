import antfu from '@antfu/eslint-config';
import jsdoc from 'eslint-plugin-jsdoc';

// noinspection JSUnusedGlobalSymbols
export default antfu(
  /** @type {import('antfu').OptionsConfig} */
  {
    stylistic: {
      semi: true,
      jsx: false,
    },
    formatters: true,
    unocss: true,
    jsonc: false,
    yaml: false,
    toml: false,
  },
  [
    {
      name: 'eslint conf',
      rules: {
        '@stylistic/padding-line-between-statements': [
          'error',
          { blankLine: 'always', prev: ['const', 'let'], next: '*' },
          { blankLine: 'any', prev: ['const', 'let'], next: ['const', 'let'] },
          { blankLine: 'always', prev: ['case', 'default'], next: '*' },
        ],
        '@stylistic/arrow-parens': [
          'error',
          'always',
        ],
        'unused-imports/no-unused-vars': ['error', { caughtErrors: 'none' }],
      },
    },
    {
      name: 'jsdoc',
      ...jsdoc.configs['flat/recommended'],
      rules: {
        'jsdoc/require-property-description': 0,
      },
    },
    {
      name: 'vue',
      files: ['**/*.vue'],
      rules: {
        'vue/max-attributes-per-line': ['error', {
          singleline: { max: 2 },
          multiline: { max: 1 },
        }],
      },
    },
  ],
);
