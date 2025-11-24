import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
      files: ["**/*.{js,mjs,cjs}"],
      plugins: { js },
      ignores: ['node_modules/', 'playwright-report/', 'test-results/', '.idea/', '**/*.json', 'playwright.config.js'],
      rules: {
          // =========================
          // General code style
          // =========================
          'quotes': ['error', 'single'],                // enforce single quotes
          'semi': ['error', 'always'],                  // require semicolons
          'indent': ['error', 4],                       // 4-space indentation
          'comma-dangle': ['error', 'always-multiline'], // trailing comma in multiline objects/arrays
          'eol-last': ['error', 'always'],             // require newline at the end of files
          'no-trailing-spaces': 'error',               // disallow trailing spaces
          'space-before-function-paren': ['error', 'never'], // no space before function parentheses
          'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }], // spacing in object literals
          'object-curly-spacing': ['error', 'always'], // spaces inside {}

          // =========================
          // Code quality
          // =========================
          'no-unused-vars': ['warn'],                  // warn on unused variables
          'no-undef': 'error',                          // disallow usage of undeclared variables
          'no-console': 'warn',                         // warn when console.log is used
          'prefer-const': 'error',                      // use const if variable is never reassigned
          'no-var': 'error',                             // disallow var
          'eqeqeq': ['error', 'always'],                // enforce strict equality ===
          'curly': ['error', 'all'],                    // require curly braces for all blocks
          'brace-style': ['error', '1tbs', { 'allowSingleLine': true }], // one true brace style

          // =========================
          // Playwright / tests specific
          // =========================
          'max-len': ['warn', { 'code': 120, 'ignoreStrings': true, 'ignoreTemplateLiterals': true }], // allow long strings for tests
          'no-empty': ['warn', { 'allowEmptyCatch': true }],  // allow empty catch blocks
      },
      extends: ['js/recommended'],
      languageOptions: { globals: globals.node }
  },

]);
