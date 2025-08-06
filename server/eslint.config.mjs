import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import { defineConfig } from 'eslint/config';
import constNamingRule from './eslint_rules/const.js';

export default defineConfig([
  // Global ignore patterns
  {
    ignores: [
      'node_modules/',
      '.env',
      '.env.*',
      '*.log'
    ]
  },

  // JavaScript files with custom rules
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      js,
      'custom-rules': {
        rules: {
          'const-naming': constNamingRule,
        }
      },
    },
    extends: ['js/recommended'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node }
    },
    rules: {
      // Your custom rules overriding recommended
      'no-var': 'error',
      'prefer-const': 'error',
      'indent': ['error', 2],
      'semi': ['error', 'always'],
      'quotes': ['error', 'single'],
      'camelcase': ['error', { properties: 'always' }],
      'max-len': ['error', { code: 100 }],
      'no-unused-vars': ['warn', { varsIgnorePattern: '^_', argsIgnorePattern: '^_' }],
      'eqeqeq': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { before: true, after: true }],
      'array-bracket-spacing': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'custom-rules/const-naming': 'error'
    }
  },

  // Support for JSON files
  {
    files: ['**/*.json'],
    plugins: { json },
    language: 'json/json',
    extends: ['json/recommended']
  },

  // Support for Markdown files
  {
    files: ['**/*.md'],
    plugins: { markdown },
    language: 'markdown/gfm',
    extends: ['markdown/recommended']
  }
]);
