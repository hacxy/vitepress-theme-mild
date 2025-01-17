import linter from '@hacxy/eslint-config/vue';

export default linter({
  typescript: true,
  rules: {
    'regexp/no-unused-capturing-group': 0,
    'no-restricted-globals': 0,
    'vue/custom-event-name-casing': 0,
    'no-undefined': 0,
    'complexity': [2, 20],
    'max-params': [2, 4],
    'vue/valid-v-slot': 0,
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'unused-imports/no-unused-vars': ['error', { caughtErrorsIgnorePattern: '^_' }],
    'vue/no-v-text-v-html-on-component': 0
  },
  ignores: [
    'config'
  ],
});
